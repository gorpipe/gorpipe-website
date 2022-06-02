---
title: "Basic GOR and NOR commands"
description: "Learning the basics of GOR and NOR"
author: "Heiðdís Rut Hreinsdóttir"
date: "2022-04-19"
image: /blogs/laptop.png
---
## You've installed GORpipe what next?

Now that you've installed GORpipe it's time to take a look at commonly used basic [functions](https://docs.gorpipe.org/functions.html) and [commands]( https://docs.gorpipe.org/commands.html) of the GOR (and NOR) query language. In this tutorial we will work with publicly available data sets from the [GTEx portal](https://gtexportal.org/home/) and [NCBI](https://www.ncbi.nlm.nih.gov). Variant based QTL data, patient level phenotypic data and Gene based annotation data to showcase the diversity of the GOR query language. The goal here is to start with basic data-wrangling in NOR context, then convert the data to GOR format to perform basic analysis in GOR context.

Save the following three files locally

- [Phenotype data](https://storage.googleapis.com/gtex_analysis_v8/annotations/GTEx_Analysis_v8_Annotations_SubjectPhenotypesDS.txt)
- [Variant based trans-QTL data](https://storage.googleapis.com/gtex_analysis_v8/single_tissue_qtl_data/GTEx_Analysis_v8_trans_sGenes_fdr05.txt)
- [Gene based annotation data](https://www.ncbi.nlm.nih.gov/datasets/tables/genes/?table_type=genes&key=8fd2b9594a3a248df4f8287bd213c87a)

Here the file names have been changed to *patient_pheno.tsv*, *transQTL_vars.tsv* and *gene_list.tsv* for code clarity. Let's get started!

## Basic data-wrangling with NOR

Start by reading through the first 100 lines of the phenotype file using **nor** along with the **top** command. Note the use of *-h* in front of the input file to treat the first line as header. If you include a *#* at the beginning of the first column the *-h* flag is not needed.

```
nor -h patient_pheno.tsv
| top 100
```

We see that the patient file contains the following four columns

​		**SUBJID** - Patient ID

​		**SEX** - Self-reported, 1=Male, 2=Female

​		**AGE** - Elapsed time since birth in years

​		**DTHHRDY** - Death classification based on the 4-point Hardy Scale, 0=Ventilator Case, 1=Violent and 		fast death, 2=Fast death of natural causes, 3=Intermediate death, 4=Slow death

Let's say we want to start by answering a couple of questions about the data set. For one the number of patients in each age category, here we can use the **group** command along with the *-count* flag

```
nor -h patient_pheno.tsv
| group -gc age -count -sc subjid
```

Note the use of *-gc* to specify the grouping column and the *-sc* in front of the subject id to indicate a string column. We also want to know how many patients belong to each of the five death classifications

```
nor -h patient_pheno.tsv
| group -gc DTHHRDY -count -sc subjid
```

Next we can calculate a column including the death classification description. For this action we use the **calc** command along with conditions specified in *if()* functions

```
nor -h patient_pheno.tsv
| calc dthhrdy_description if(dthhrdy='0','Ventilator Case',
if(dthhrdy='1','Violent and fast death',
if(dthhrdy='2','Fast death of natural causes',
if(dthhrdy='3','Intermediate death',
if(dthhrdy='4','Slow death',
'No description provided')))))
```

We can also select the columns of interest using the **select** command and filter the data set using the **where** command

```
nor -h patient_pheno.tsv
| select SUBJID,AGE,SEX
| where sex=1
```

Now lets have a look at the trans-QTL data set typing `nor -h transQTL_vars.tsv ` shows us that the data has 21 columns and consists of 29 rows of data. We are interested in combining the two data sets. Since there is no actual connection between them we will combine the data based on row number using the **rownum** command along with **map**

```
nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
```

Note the use of a *nested query*, the `<(nor -h ...)` this is done to perform actions on the phenotype file before executing the mapping between the two data streams. Also note the use of **columnsort** compared to the **select** command at the end. **Columnsort** will re-order the columns specified without filtering out any columns. For combining two data sets, using **map**, it is necessary for the leftmost column of the right source (the phenotype file) to be the mapping column. 

Note that the rownum column can be handy to easily retrieve a given row, or retrive the first or last row with certain conditions. For example adding `| atmin rownum -gc tissue_id -ordered` would result in only the first row of each tissue type. 

Additional basic joining methods include the **multimap**, **merge** and **inset** commands. The **map** command above will result in a comma separated value where the right source contains multiple rows/occurances for the mapping column, **multimap** on the other hand matches all occurrences resulting in multiple rows. The **merge** command will append one data source to another and **inset** will filter the right source based on the data in the left source.

Here is an example of using **merge** and a nested query that will result in all duplicated rows. If there is a mismatch between the number of columns of the left and right data source empty values are provided.

```
nor -h transQTL_vars.tsv | merge <(nor -h transQTL_vars.tsv)
```

Here is an example of using **inset**, adding a *-b* flag to the command will result in a boolean column called *inSet* to indicate if the filter column value is present in the right source.

 ```
nor -h transQTL_vars.tsv | skip 10 | top 20 | inset -c tissue_id <(nor -h transQTL_vars.tsv | top 20)
 ```

With the data combined lets look at different ways to aggregate the data. The **group** command can be used very effectively here as well. For example to retrieve the max row number per tissue type and all subject ids in a comma separated list

```
nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| group -gc tissue_id -max -ic rownum -lis -sc subjid
| rename lis_(.*) #{1}
```

Notice the use of the **rename** command, removing the *lis_* prefix automatically generated by the **group** command per individual flag. The **granno** command is another useful command that performs aggregation on a given column without collapsing rows

```
nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| granno -gc tissue_id -avg -ic maf
```

Here we are also aggregating on tissue_id but calculating the average allele frequency per tissue type. By adding something like`| where avg_maf > 0.3 ` we can filter on the data.

Finally the **pivot** and **unpivot** commands can be used to aggregate and convert the data. A very simple unpivot example would be to unpivot on the tissue_id column, resulting in two columns *col_name* and *col_value*

```
nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| unpivot 1-
| distinct
```

Adding the **distinct** command will return only unique rows. Here you could easily add some QC methods such as removing all values that are empty  `| where Col_Value != ''` or counting all different types of column values `| group -gc col_name -sc col_value -count`. The **pivot** command is a little more complex as you have to provide the different types you want to map the row based data on over to horizontal format. Here we categorise the subjects in the data set as either case or control and pivot based on these two types

```
nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| calc type if(sex=2 and age='60-69','case','ctrl')
| pivot type -v case,ctrl -gc subjid -e 'missing'
```

Finally before moving over to genomically ordered data here are a couple of useful string functions

```
nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
/* listsize returns the size the elements in a list based on a given separator */
| calc list_size listsize(variant_id, '_')
/* Replace an element in a list with another */
| replace tissue_id replace(tissue_id,'_',',')
/* Filter the list based on a given condition */
| where listhasany(tissue_id, 'Blood')
/* Replace based on if/else, retrieving the first element of a list if the condition is true */
| replace tissue_id if(maf < 0.3, listfirst(tissue_id), tissue_id)
/* combine multiple column values into one, using a given separator*/
| calc new_col cols2list('maf,rownum,list_size', '-')
/* combine multiple lists into one, based on a filter condition applied to each element in the list */
| calc new_list listzip(variant_id,listfilter(tissue_id, "x!='Whole'"))
```

Note how comments are represented within the GOR query language  */\* a GOR comment \*/*. 

## Basic GOR queries

In order to ensure a valid GOR file there are two conditions that need to be met

1. The data needs to contain as the first four columns: CHROM, POS, REF, ALT for variant based data and CHROM, Gene_start, Gene_stop for gene based data
2. The data has to be genomically ordered by chromosome and position, this is achieved using the **sort genome** command.

Lets start by converting our combined data set to GOR format and **write** out the file. Since we want to be in GOR context we use **gor** instead of **nor**, note however that all the commands and functions covered above can also be used in GOR context - along with many additional ones! 

We start by using **colsplit** to generate the required data columns from the variant_id column

```
create ##gor_format## = gor <(nor -h transQTL_vars.tsv
| rownum
| map -c rownum <(nor -h patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| colsplit variant_id 4 col -s '_'
| columnsort col_*
| rename col_1 CHROM
| rename col_2 POS
| rename col_3 REF
| rename col_4 ALT
| hide variant_id)
| sort genome;

gor [##gor_format##] | write comb_data.gorz
```

Notice the use of the **create** statement to create an intermediate data table, referenced below in square brackets and the **hide** command to remove the variant_id column from the data set as it is no longer needed. Now we have a compressed data file on GOR format and can quickly seek the file based on chromosome, variant or a given range using the *-p* flag

```
gor -p chr9:97776641 comb_data.gorz
```

We can also retrieve a list of individuals with a given variant with an easy "one-liner" query

```
gor comb_data.gorz
| group 1 -gc ref,alt -lis -sc subjid
```

Same goes for the maximum allele frequency per variant which can be done as follows

```
gor comb_data.gorz
| atmax 1 -gc ref,alt maf
```

The most common way to combine two GOR files is using the **varjoin** command

```
gor comb_data.gorz
| varjoin comb_data.gorz
```

To make the results a bit more interesting lets convert the gene_list.tsv to GOR format

```
gor <(nor -h gene_list.tsv
| rename Chromosome CHROM
| replace CHROM 'chr'+chrom
| colsplit genomic_coordinates 2 col -s ':'
| colsplit col_2 2 pos -s '-'
| rename pos_1 gene_start
| rename pos_2 gene_stop
| select CHROM,gene_start,gene_stop,gene_symbol,ensembl_gene_id)
| sort genome
| write genes.gorz
```

Since one file is variant based and the other gene based we will use **join** along with a *-snpseg* flag

```
gor comb_data.gorz
| join -snpseg -rprefix genes genes.gorz
| replace genes_* replace(listfilter(#rc,'x!="PTCSC2"'),',',', ')
```
Notice the use of the *-rprefix* flag, this will add a given prefix to all columns from the right source. Also notice the **replace** with the *#rc*, here we are applying the **replace** command to all columns starting with the *genes_* prefix and the *listfilter()* function will repeat for all columns and all elements within the column list.
The variations of options to include with the **join** command are many, adding a *-ic* flag will return overlap count, adding *-xl* for additional equi-joins and *-f* to perform a fuzzy join to name a few. For more information on GOR joins check out the [documentation](https://docs.gorpipe.org/command/JOIN.html?highlight=join#join-1). 

As you can see querying genomically ordered data is a breeze with the GOR query language!

### Test your knowledge!

Here are some fun excercises to test your knowledge and further your GORstanding!

1. Select the first seven columns and rename them with a "GOR_" prefix.
2. Calculate a column called phenotype to categorise individuals as a case or control. Cases should be those that are 30-39 years old and died of natural causes.
3. Return the male/female ratio of the phenotype data set.
4. Return the average pp4 value per tissue type and all other columns as comma separated lists.
5. Try out the **sort** command to order the data in the tissue_id column in a descending order.
6. Return the complete number of variants in the comb_data.gorz data set.
7. Return the number of variants in each segment.

   
You should now be ready to take on more advanced GOR queries, deep diving into the GORdb data structure and the stand-alone **Sequence Miner** that comes complete with reference data on GOR format - stay tuned for the next [blog post](/blog)!

Happy GORing!