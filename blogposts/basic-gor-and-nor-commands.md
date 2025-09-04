---
title: "Basic GOR and NOR commands"
description: "Learning the basics of GOR and NOR"
author: "Heiðdís Rut Hreinsdóttir"
date: "2022-04-19"
image: /blogs/laptop.png
---
## You've installed GORpipe what next?

Now that you've installed GORpipe it's time to take a look at commonly used basic [functions](https://docs.gorpipe.org/functions.html) and [commands]( https://docs.gorpipe.org/commands.html) of the GOR (and NOR) query language. In this tutorial we will work with publicly available data sets from the [GTEx portal](https://gtexportal.org/home/) and [NCBI](https://www.ncbi.nlm.nih.gov). Variant based QTL data, patient level phenotypic data and Gene based annotation data to showcase the diversity of the GOR query language. The goal here is to start with basic data-wrangling in NOR context, then convert the data to GOR format to perform basic analysis in GOR context.

Save the following files locally

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

​       **SUBJID** - Patient ID

​       **SEX** - Self-reported, 1=Male, 2=Female

​       **AGE** - Elapsed time since birth in years

​       **DTHHRDY** - Death classification based on the 4-point Hardy Scale, 0=Ventilator Case, 1=Violent and       fast death, 2=Fast death of natural causes, 3=Intermediate death, 4=Slow death

Let's say we want to start by answering a couple of questions about the data set. For one the number of patients in each age category, here we can use the **group** command along with the *-count* flag

```
nor patient_pheno.tsv
| group -gc age -count
```

Note the use of *-gc* to specify the grouping column and the *-sc* in front of the subject id to indicate a string column. We also want to know how many patients belong to each of the five death classifications

```
nor patient_pheno.tsv
| group -gc DTHHRDY -count
```

Next we can calculate a column including the death classification description. For this action we use the **calc** command along with conditions specified in if-else statements using the *if()* function

```
nor patient_pheno.tsv
| calc dthhrdy_description if(dthhrdy='0','Ventilator Case',
if(dthhrdy='1','Violent and fast death',
if(dthhrdy='2','Fast death of natural causes',
if(dthhrdy='3','Intermediate death',
if(dthhrdy='4','Slow death',
'No description provided')))))
```

We can also select the columns of interest using the **select** command and filter the data set using the **where** command

```
nor patient_pheno.tsv
| select SUBJID,AGE,SEX
| where sex=1
```

Now lets have a look at the trans-QTL data set typing `nor transQTL_vars.tsv ` shows us that the data has 21 columns and consists of 29 rows of data. We are interested in combining the two data sets. Since there is no actual connection between them we will combine the data based on row number using the **rownum** command along with **map**

```
nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
```

Note the use of a *nested query*, the `<(nor patient_pheno.tsv  ...)` this is done to perform actions on the phenotype file before executing the mapping between the two data streams. Also note the use of **columnsort** compared to the **select** command at the end. **Columnsort** will re-order the columns specified without filtering out any columns. For combining two data sets, using **map**, it is necessary for the leftmost column of the right source (the phenotype file) to be the mapping column. 

Note that the rownum column can be handy to easily retrieve a given row, or retrive the first or last row with certain conditions. For example adding `| atmin rownum -gc tissue_id` would result in only the first row of each tissue type. 

Additional basic joining methods include the **multimap**, **merge** and **inset** commands. The **map** command above will result in a comma separated value where the right source contains multiple rows/occurances for the mapping column, **multimap** on the other hand matches all occurrences resulting in multiple rows. The **merge** command will append one data source to another and **inset** will filter the left source based on the data in the right source.

Here is an example of using **merge** and a nested query that will result in all duplicated rows. If there is a mismatch between the number of columns of the left and right data source empty values are provided.

```
nor transQTL_vars.tsv | merge <(nor transQTL_vars.tsv)
```

Here is an example of using **inset**, adding a *-b* flag to the command will result in a boolean column called *inSet* to indicate if the filter column value is present in the right source.

 ```
nor transQTL_vars.tsv | skip 10 | top 20 | inset -c tissue_id <(nor transQTL_vars.tsv | top 20)
 ```

With the data combined lets look at different ways to aggregate the data. The **group** command can be used very effectively here as well. For example to retrieve the max row number per tissue type and all subject ids in a comma separated list

```
nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| group -gc tissue_id -max -ic rownum -lis -sc subjid
| rename lis_(.*) #{1}
```

Notice the use of the **rename** command, removing the *lis_* prefix automatically generated by the **group** command per individual flag. The **granno** command is another useful grouping and annotation command that performs aggregation on a given column without collapsing rows

```
nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| granno -gc tissue_id -avg -ic maf
```

Here we are also aggregating on tissue_id but calculating the average allele frequency per tissue type. By adding something like`| where avg_maf > 0.3 ` we can filter on the data.

Finally the **pivot** and **unpivot** commands can be used to aggregate and convert the data. A very simple unpivot example would be to unpivot on the tissue_id column, resulting in two columns *col_name* and *col_value*

```
nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| unpivot 1-
| distinct
```

Adding the **distinct** command will return only unique rows. Here you could easily add some QC methods such as removing all values that are empty  `| where Col_Value != ''` or counting all different types of column values `| group -gc col_name -sc col_value -count`. The **pivot** command is a little more complex as you have to provide the different types you want to map the row based data on over to horizontal format. Here we categorise the subjects in the data set as either case or control and pivot based on these two types

```
nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
| select tissue_id,variant_id,maf,pval_nominal,pval_beta,pp4,age,dthhrdy,sex,subjid,rownum
| calc type if(sex=2 and age='60-69','case','ctrl')
| pivot type -v case,ctrl -gc subjid -e 'missing'
```

Finally before moving over to genomically ordered data here are a couple of useful string functions

```
nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
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
create ##gor_format## = gor <(nor transQTL_vars.tsv
| rownum
| map -c rownum <(nor patient_pheno.tsv | rownum | columnsort rownum)
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

Notice the use of the **create** statement to create an intermediate data table, referenced below in square brackets. The **hide** command is then used to remove the *variant_id* column from the data set as it is no longer needed. Here we again use the nested query function, to first perform some actions in nor context, then applying the **sort genome** command in GOR context after the nested query. To fully showcase the power of GOR we generate a couple of additional files and **write** them out and sore on *.gorz*, compressed GOR format, you can see the data below in the appendix.

Now that we have data on GOR format we can quickly seek the file based on chromosome, variant or a given range using the *-p* flag

```
gor -p chr9:97776641 comb_data.gorz
```

We can also retrieve a list of individuals with a given variant with an easy "one-liner" query

```
gor comb_data.gorz
| group 1 -gc ref,alt -lis -sc subjid
```

Same goes for retrieving the maximum allele frequency per 1000 base pairs

```
gor comb_data.gorz
| atmax 1000 maf
```

The most common way to combine two GOR files is using the **varjoin** command, when both files are variant based. For example we can quickly annotate the combined results with VEP annotations

```
gor comb_data.gorz
| varjoin vep_annotations.gorz
```

Adding *-l -r* after the varjoin will perform left-join overlap, showing all rows in the left source and reduce the output columns from the right source. This query takes less than a second and annotates the data with four new columns. 

We can also annotate the variant file with a gene based file using the **join** command along with a *-snpseg* flag

```
gor comb_data.gorz
| join -snpseg -rprefix genes genes.gorz
```

Notice the use of the *-rprefix* flag, this will add a given prefix to all columns from the right source. We can also combine all three data sets

```
gor comb_data.gorz
| varjoin -l -r -rprefix VEP vep_annotations.gorz
| join -snpseg -xl vep_gene_symbol -xr gene_symbol -rprefix GENES genes.gorz
```

Here we add the *-l -r* flags, discussed above, along with the *-xl* *-xr*  to perform additonal equipment-join on the gene symbols from the two data sets. The variations of options to include with both **varjoin** and **join** commands are many, for more information check out the [documentation](https://docs.gorpipe.org/search.html?q=join+varjoin&check_keywords=yes&area=default#). As mentioned above all actions covered in NOR context can be used in GOR context just as easily, such as aggregating or applying list functions

```
gor comb_data.gorz
| varjoin -l -r -rprefix VEP vep_annotations.gorz
| join -snpseg -xl vep_gene_symbol -xr gene_symbol -rprefix GENES genes.gorz
| group 1 -gc ref,alt -lis -sc VEP_consequence,GENES_gene_symbol
| replace lis_* replace(listfilter(#rc,'x!="PTCSC2"'),',',', ')
| replace lis_VEP_Consequence listdist(LISTSORTDESC(lis_VEP_Consequence))
```

Notice the **replace** with the *#rc*, here we are applying the **replace** command to all columns starting with the *lis_* prefix and the *listfilter()* function will repeat for all columns and all elements within the column list. Finally we can also annotate a GOR file using the **map** command

````
gor comb_data.gorz
| join -snpseg -f 10 genes.gorz
| map -c gene_symbol <(nor vep_annotations.gorz | select gene_symbol,impact,consequence)
````

Notice the use of *-f* to make the **join** a fuzzy join with a fuzzfactor of ten bases. Here the VEP annotation GOR file is simply used in NOR context and the *gene_symbol* column the mapping column. Performing this annotation using **varjoin**  is however much faster and more effective. As you can see querying genomically ordered data is a breeze with the GOR query language!

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




## Appendix

Ensembl VEP annotations on GOR format, vep_annotations.gorz

```
CHROM	POS	REF	ALT	rsid	Consequence	IMPACT	gene_symbol
chr10	60017871	C	T	rs10994139	intergenic_variant	MODIFIER	-
chr10	97692560	C	T	rs75040573	intergenic_variant	MODIFIER	-
chr11	7089006	C	G	rs11041169	5_prime_UTR_variant	MODIFIER	RBMXL2
chr11	7089006	C	G	rs11041169	regulatory_region_variant	MODIFIER	-
chr12	323500	G	C	rs3213751	downstream_gene_variant	MODIFIER	KDM5A
chr12	323500	G	C	rs3213751	intron_variant	MODIFIER	KDM5A
chr12	323500	G	C	rs3213751	upstream_gene_variant	MODIFIER	KDM5A
chr12	53778939	G	A	rs2365675	intron_variant	MODIFIER	-
chr12	53778939	G	A	rs2365675	non_coding_transcript_variant	MODIFIER	-
chr12	97393987	G	T	rs7304337	intergenic_variant	MODIFIER	-
chr13	43507920	A	C	rs10047763	intron_variant	MODIFIER	ENOX1
chr14	100404148	T	TA	rs57266307	intron_variant	MODIFIER	WDR25
chr14	100404148	T	TA	rs57266307	NMD_transcript_variant	MODIFIER	WDR25
chr14	100404148	T	TA	rs57266307	non_coding_transcript_variant	MODIFIER	WDR25
chr14	100404148	T	TA	rs57266307	regulatory_region_variant	MODIFIER	-
chr14	100404148	T	TA	rs57266307	upstream_gene_variant	MODIFIER	-
chr15	51302734	C	T	rs2445758	intron_variant	MODIFIER	CYP19A1
chr15	51302734	C	T	rs2445758	regulatory_region_variant	MODIFIER	-
chr15	101775997	T	G	rs1810232	downstream_gene_variant	MODIFIER	DNM1P47
chr15	101775997	T	G	rs1810232	intron_variant	MODIFIER	DNM1P47
chr15	101775997	T	G	rs1810232	non_coding_transcript_variant	MODIFIER	DNM1P47
chr15	101775997	T	G	rs1810232	intron_variant	MODIFIER	GOLGA8VP
chr15	101775997	T	G	rs1810232	non_coding_transcript_variant	MODIFIER	GOLGA8VP
chr15	101775997	T	G	rs1810232	upstream_gene_variant	MODIFIER	RN7SL209P
chr16	22081226	A	G	rs62047199	3_prime_UTR_variant	MODIFIER	MOSMO
chr16	22081226	A	G	rs62047199	downstream_gene_variant	MODIFIER	-
chr16	22081226	A	G	rs62047199	downstream_gene_variant	MODIFIER	MOSMO
chr16	22081226	A	G	rs62047199	intron_variant	MODIFIER	MOSMO
chr16	22081226	A	G	rs62047199	NMD_transcript_variant	MODIFIER	MOSMO
chr16	22081226	A	G	rs62047199	upstream_gene_variant	MODIFIER	MOSMO
chr16	36169633	C	T	rs1435502613	intergenic_variant	MODIFIER	-
chr21	36872872	G	A	rs73385297	intron_variant	MODIFIER	HLCS
chr21	36872872	G	A	rs73385297	NMD_transcript_variant	MODIFIER	HLCS
chr22	45952150	C	T	rs28678280	intron_variant	MODIFIER	WNT7B
chr3	21783666	G	C	rs12638755	intron_variant	MODIFIER	ZNF385D
chr3	21783666	G	C	rs12638755	NMD_transcript_variant	MODIFIER	ZNF385D
chr3	166217640	T	C	rs9851410	intergenic_variant	MODIFIER	-
chr5	2361524	A	C	rs114258117	intergenic_variant	MODIFIER	-
chr5	112877374	G	T	rs2545167	3_prime_UTR_variant	MODIFIER	REEP5
chr5	112877374	G	T	rs2545167	downstream_gene_variant	MODIFIER	REEP5
chr5	112877374	G	T	rs2545167	intron_variant	MODIFIER	SRP19
chr5	112877374	G	T	rs2545167	NMD_transcript_variant	MODIFIER	SRP19
chr5	112877374	G	T	rs2545167	non_coding_transcript_variant	MODIFIER	SRP19
chr5	133632835	C	T	rs6596132	intergenic_variant	MODIFIER	-
chr6	33912023	G	A	rs4711366	intron_variant	MODIFIER	-
chr6	33912023	G	A	rs4711366	non_coding_transcript_variant	MODIFIER	-
chr6	33912023	G	A	rs4711366	non_coding_transcript_exon_variant	MODIFIER	-
chr6	33912023	G	A	rs4711366	regulatory_region_variant	MODIFIER	-
chr6	163381871	T	G	rs9347747	intergenic_variant	MODIFIER	-
chr9	65074798	G	A	rs963551270	intergenic_variant	MODIFIER	-
chr9	97776641	A	G	rs10818050	intron_variant	MODIFIER	PTCSC2
chr9	97776641	A	G	rs10818050	non_coding_transcript_variant	MODIFIER	PTCSC2
chr9	97793827	A	G	rs965513	intron_variant	MODIFIER	PTCSC2
chr9	97793827	A	G	rs965513	non_coding_transcript_variant	MODIFIER	PTCSC2
chr9	137801650	G	C	rs112780689	downstream_gene_variant	MODIFIER	EHMT1
chr9	137801650	G	C	rs112780689	intron_variant	MODIFIER	EHMT1
chr9	137801650	G	C	rs112780689	NMD_transcript_variant	MODIFIER	EHMT1
chr9	137801650	G	C	rs112780689	non_coding_transcript_variant	MODIFIER	EHMT1
```

NCBI gene list on GOR format, genes.gorz

```
CHROM	gene_start	gene_stop	Gene_Symbol	Ensembl_Gene_ID
chr11	7088998	7091148	RBMXL2	ENSG00000170748
chr12	280057	389320	KDM5A	ENSG00000073614
chr13	43213130	43786972	ENOX1	ENSG00000120658
chr14	100376485	100530303	WDR25	ENSG00000176473
chr15	51208057	51338596	CYP19A1	ENSG00000137869
chr15	101764629	101767023	DNM1P47	
chr15	101775281	101779514	GOLGA8VP	
chr16	22008111	22092652	MOSMO	ENSG00000185716
chr21	36748625	36990211	HLCS	ENSG00000159267
chr22	45920366	45977162	WNT7B	ENSG00000188064
chr3	21412218	22372763	ZNF385D	ENSG00000151789
chr5	112861287	112898371	SRP19	ENSG00000153037
chr5	112876385	112922227	REEP5	ENSG00000129625
chr6	33889511	33896907	LINC01016	ENSG00000249346
chr9	97699625	97853080	PTCSC2	ENSG00000236130
chr9	137619005	137836127	EHMT1	ENSG00000181090
```
