---
title: "Using raw 23andme data in GOR"
author: "Alison MacNeil"
date: "2020-03-03"
image: /blogs/gorcli.png
---

Pulling teeth can I just chime in on that one, but highlights we need to button up our approach back of the net. I'll book a meeting so we can solution this before the sprint is over productize tbrand terrorists Bob called an all-hands this afternoon, clear blue water for run it up the flag pole. A set of certitudes based on deductions founded on false premise strategic fit, but tribal knowledge. Screw the pooch obviously downselect nor build on a culture of contribution and inclusion. Driving the initiative forward they have downloaded gmail and seems to be working for now so nobody's fault it could have been managed better for optimize for search that is a good problem to have. Message the initiative we need to future-proof this deliverables, window of opportunity yet product management breakout fastworks this is our north star design.

# 1 - Download raw data from 23andme.com

There is a download link in the top right corner of the "Browse raw data" page.

# 2 - Clone arrogantrobot/23andme2vcf repo

This github repo has a tool that converts the raw data from 23andme to vcf, you can clone this repo using the following git command on your terminal:

```bash
git clone git://github.com/arrogantrobot/23andme2vcf.git
cd 23andme2vcf
```

# 3 - Run .txt to .vcf conversion

The following command starts the conversion tool using the latest available reference package:

```bash
perl 23andme2vcf.pl /path/to/23andme_raw.txt /path/to/output.vcf 4
```

There might be a message about parts of the file not matching the reference but downgrading to version 3 is not likely to yield better results.

# 4 - Convert .vcf to .gor

Now we need to convert the .vcf file to our .gor format:

```bash
./gorpipe "gor /path/to/you.vcf | columnsort 1,2,4,5,3 " > /path/to/you.gor
```

For the above command to work you may need to get and build gorpipe:

```bash
git clone git@bitbucket.org:nextcode-health/gor.git
cd gor
./gradlew installDist
cd server/build/install/gor-scripts/bin
```

# 5 - Query the data in Sequence Miner

You can do this by connecting to either dev or test, the file we want to browse is stored locally so it doesn't matter what project you choose.

1. Launch Sequence Miner application
2. In the left hand menu choose "Data Query".
3. Copy and paste the query below, remember to edit the file location in the second line!
4. Hit the little running man button.

```
create ##you1## = gor [file:/path/to/you.gor] | select
CHROM,POS,REF,ALT,rsIDs | sort genome;
create ##MAXFREQ## = pgor ref/freq*max.gorz | select 1-4,max_af | varmerge
#3 #4 | group 1 -gc #3,#4 -max -fc max_af | rename max_max_af max_af;
create ##you2## = gor [##you1##] | join -snpsnp -l -r #dbsnp# | Select
1,2,reference,allele,rsIDs;
create ##temp## = pgor [##you2##] | select 1-4 | rename #4 call | varjoin -
r <(#wesVEP# | select 1-
4,MAX_IMPACT,MAX_CONSEQUENCE,max_score,Amino_Acids,Protein_Position,GENE_SY
MBOL | where max_consequence in
('transcript_ablation','splice_donor_variant','splice_acceptor_variant','st
op_gained','frameshift_variant','stop_lost','initiator_codon_variant','infr
ame_insertion','inframe_deletion','missense_variant','transcript_amplificat
ion','splice_region_variant','incomplete_terminal_codon_variant') | varjoin
-l -e 0 -r [##MAXFREQ##] | where isfloat(max_Af) and float(max_Af) <= 0.01
| varjoin -l -r -rprefix KNOWN <(gor #clinicalvars# | select 1-
Alt,Disease,MaxClinImpact,DbSource | rename Disease var_diseases | where
MaxClinImpact = 'Pathogenic' | group 1 -gc 3,4 -set -sc MaxClinImpact) ) |
varjoin -l -r -rprefix dbSNP #dbsnp# | calc Cat4 IF(max_Af > 0.01,1,0) |
calc Cat1 IF(Cat4 = 0 and KNOWN_set_MaxClinImpact != '' ,1,0) | calc Cat2
IF(Cat4 = 0 and Cat1=0 and max_impact = 'HIGH',1,0) | calc Cat3A IF(Cat4 =
0 and Cat1=0 and Cat2=0 and (max_Consequence = 'missense_variant' and
max_score >= 0.9),1,0) | calc Cat3B IF(Cat4 = 0 and Cat1=0 and Cat2=0 and
Cat3A=0 and (max_impact = 'LOW' or (max_impact = 'MODERATE' and Cat3A =
0)),1,0) | calc Cat
IF(Cat1>0,'Cat1',IF(Cat2>0,'Cat2',IF(Cat3A>0,'Cat3A',IF(Cat3B>0,'Cat3B','Ca
t4')))) | replace Cat4 IF(Cat = 'Cat4',1,0) | varjoin -l -r <(gor
#clinicalvars# | select 1-disease | rename disease KNOWN_var_diseases) |
hide Cat4-Cat3B,Known_set_maxclinimpact | rename Cat DIAG_ACMGCat | prefix
max_impact-protein_position VEP ;
gor [##temp##] | join -varseg -f 10 -r -l -xl gene_symbol -xr gene_symbol
<(gor #GeneDetails# | prefix gene_stable_id,biotype- GENE | map
ref/ensgenes/ensgenes.map -c gene_symbol -m ? -n
GENE_Aliases,OMIM_IDs,OMIM_Descriptions,GENE_Paralogs,GO_IDs,GO_Description
s) | join -varseg -f 10 -r -l -xl gene_symbol -xr gene_symbol <(gor #genes#
| select 1,2,3,gene_symbol | multimap
ref/ensgenes/ensgenes_gene2pathway.mmap -c gene_symbol -n Pathway | group 1
-gc 3,gene_symbol -ac Pathway -set -len 256) | join -varseg -l -f 10 -r -xl
GENE_SYMBOL -xr GENE_SYMBOL #clinicalgenes# | hide GENE_SYMBOLx\*,lis*_ |
hide maxclinimpact | rename Gene_diseases KNOWN_gene_diseases | rename
set_Pathway Gene_Pathways | join -varseg -l -r -xl gene_symbol -xr
gene_symbol <(gor #genes# | map ref/ensgenes/ensgenes_disease.map -c
gene_symbol -h -m '' | map ref/disgenes/CGD.map -c gene_symbol -h -m '' |
select 1-
3,gene_symbol,gene_in_disease,MANIFESTATION_CATEGORIES,INTERVENTION_RATIONA
LE,COMMENTS,INTERVENTION_CATEGORIES,REFERENCES,CONDITION,INHERITANCE,AGE_GR
OUP | rename Gene_in_disease KNOWN_GeneLists | prefix 6#- CGD | replace
CGD_inheritance trim(CGD_inheritance) | replace KNOWN_GeneLists
listfilter(KNOWN_GeneLists,'len(x)>0') | join -segseg -r -l -xl gene_symbol
-xr gene_symbol <(gor ref/gene_panel_diseases.gorz | split diseases |
rename panel panels | group 1 -gc #3,gene_symbol -len 10000 -set -dis -sc
panels,diseases | replace set_ if(listsize(#rc)>1,'"'+replace(#rc,',','",
"')+'"',#rc) | rename set*(.\*) EuroGenetest*#{1} | rename dis\_(._)
EuroGenetest_NoOf#{1} ) ) | hide gene_symbolx,gene_symbolxx | calc
KNOWN_InACMG IF(contains(KNOWN_GeneLists,'acmg'),'true','false') | varjoin
-r -l -rprefix COMM <(gor #varcomments# | select 1-
4,CLINICAL_SIGNIFICANCE,MODE_OF_INHERITANCE,TEXT | group 1 -gc 3,4 -len 500
-lis -sc 5- | rename lis_CLINICAL_SIGNIFICANCE CLINICAL_SIGNIFICANCE |
rename lis_MODE_OF_INHERITANCE MODE_OF_INHERITANCE | rename lis_TEXT TEXT |
replace CLINICAL_SIGNIFICANCE listfilter(CLINICAL_SIGNIFICANCE,'len(x)>0')
| replace MODE_OF_INHERITANCE listfilter(MODE_OF_INHERITANCE,'len(x)>0') |
replace TEXT listfilter(TEXT,'len(x)>0')) | columnsort
1,2,Reference,Call,DIAG_,GT*,Gene*,VEP\* | top 10000
```

# 6 - Try to make sense of the results

This is the difficult part, you will likely have gotten a ton of variants returned but reading the results is a bit tricky. Here are a few tips but please note that this is barely scratching the surface of how this data should be interpreted.

1. In the filtering menu to the right of the results open the 'Other columns' menu
   1. Right click 'DIAG_ACMGCat'
   1. Choose 'Filter...'
   1. Select 'Cat1' and 'Cat2' then hit 'Apply'
1. In the filtering menu to the right of the results open the 'VEP' menu
   1. Right click 'Max_Impact'
   1. Choose 'Filter...'
   1. Select 'HIGH' and then hit 'Apply'
1. Scroll all the way to the right to the OMIM_IDs column, these can be looked up here.

# Appendix

The data from 23andme isn't always very useful (or reliable), for example you might end up with their internal Id's in the ID column instead of the standard rsID value:

[https://www.biostars.org/p/62944/](https://www.biostars.org/p/62944/)

Here is an example of what this looks like in the .vcf file:

```
#CHROM POS ID REF ALT QUAL FILTER INFO FORMAT GENOTYPE
chr1 734462 rs12564807 G A . . . GT 1/1
chr1 752721 rs3131972 A G . . . GT 0/1
chr1 760998 rs148828841 C . . . . GT 0/0
chr1 776546 rs12124819 A . . . . GT 0/0
chr1 787173 rs115093905 G . . . . GT 0/0
chr1 798959 rs11240777 g A . . . GT 0/1
chr1 824398 rs7538305 a C . . . GT 0/1
chr1 838555 rs4970383 c A . . . GT 0/1
chr1 846808 rs4475691 C T . . . GT 0/1
chr1 854250 rs7537756 A G . . . GT 0/1
chr1 861808 rs13302982 A G . . . GT 1/1
chr1 864490 rs55678698 C . . . . GT 0/0
chr1 871267 i6019299 C . . . . GT 0/0
chr1 873558 rs1110052 G T . . . GT 0/1
chr1 878697 rs147226614 G . . . . GT 0/0
```

Note that most of the SNP's have their dbSNP rsID listed but the third to last one is useless since 23andme's internal mapping of ID's is not public data.
