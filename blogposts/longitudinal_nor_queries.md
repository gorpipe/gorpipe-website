---
title: "Longitudinal phenotype analysis"
description: "Longitudinal phenotype analysis"
author: "Heiðdís Rut Hreinsdóttir"
date: "2022-05-30"
image: /blogs/data_distribution.png
---
## Analysing longitudinal phenotype data with NOR

When it comes to genome-wide association studies, longitudinal phenotypic data is becoming more and more desireable as the results are by far more powerful than baseline analysis[^1]. In this tutorial we will showcase useful queries to retrieve meaningful data from longitudinal data sets.

For the purpose of showcasing the GOR query language capabilities we will start by simulating data, using a [GTEx phenotype file](https://storage.googleapis.com/gtex_analysis_v8/annotations/GTEx_Analysis_v8_Annotations_SubjectPhenotypesDS.txt) as a starting point, see the query in the appendix below.

A quick look at our longitudinal data set shows we have 1780 rows and eight columns; SUBJID, SEX, AGE, DTHHRDY, DOD, DOB, lab_measurement and lab_date

```
nor -h lab_measurements.tsv
```

Next we might want to answer a couple of simple questions about the data set, such as the average age in years per males and females. Here we can make use of the *yeardiff()* function and the **group** command along with the *-avg* flag. More on date functions [here](https://docs.gorpipe.org/functions.html#date-functions).

```
nor -h lab_measurements.tsv
| calc age_in_years yeardiff('yyyy-MM-dd',DOB,DOD)
| group -gc sex -avg -ic age_in_years
```

Another interesting question might be to return all individuals with two or more lab measurements on a given date

```
nor -h lab_measurements.tsv
| group -gc subjid,lab_date -count -ordered -lis -ic lab_measurement
| where allCount >= 2
```

TODO:

--> Define severity based on number of lab measurements above 0.5 that occur within 1 year of one another


Make sure to check out other [blog posts](/blog) - Happy GORing!



#### Appendix

```GOR
/* Simulated longitudinal data */
create ##lab_1## = nor -h patient_pheno.tsv 
| select SUBJID
| skip 100
| top 200
/* Random() function to generate random floating point values */
| calc lab_measurement form(random(),4,2)+','+form(random(),4,2);

create ##lab_2## = nor -h patient_pheno.tsv 
| select SUBJID
| skip 50
| top 200
| calc lab_measurement form(random(),4,2)+','+form(random(),4,2);

create ##all_lab## = nor -h patient_pheno.tsv 
| select SUBJID
| calc lab_measurement form(random(),4,2)
| merge [##lab_1##] 
| merge [##lab_2##];

nor -h patient_pheno.tsv
| calc DOD date('yyyy-MM-dd')
| replace DOD adddays('yyyy-MM-dd',DOD,round(random()*10)+15)
| replace DOD addmonths('yyyy-MM-dd',DOD,round(random()*2)+3)
| calc today date('yyyy-MM-dd')
| calc DOB if(age='20-29',addyears('yyyy-MM-dd',today,-round((20+29)/2)),
		 if(age='30-39',addyears('yyyy-MM-dd',today,-round((30+39)/2)),
		 if(age='40-49',addyears('yyyy-MM-dd',today,-round((40+49)/2)),
		 if(age='50-59',addyears('yyyy-MM-dd',today,-round((50+59)/2)),
		 if(age='60-69',addyears('yyyy-MM-dd',today,-round((60+69)/2)),
		 if(age='70-79',addyears('yyyy-MM-dd',today,-round((70+79)/2)),today))))))
| replace DOB adddays('yyyy-MM-dd',DOB,round(random()*10)+15)
| replace DOB addmonths('yyyy-MM-dd',DOB,round(random()*2)+3)
| multimap -c SUBJID [##all_lab##]
| split lab_measurement
| calc lab_date addyears('yyyy-MM-dd',DOD,round(random()*5-20)+10)
| replace lab_date adddays('yyyy-MM-dd',lab_date,round(550+random()))
| hide today
| write lab_measurements.tsv
```

[^1]: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4895696/