---
title: "Getting Started with GORpipe"
description: "Downloading GORpipe"
author: "Heiðdís Rut Hreinsdóttir"
date: "2021-10-19"
image: /blogs/gorcli.png
---

## Make sure you have the correct prerequisites 
GORpipe depends on version 11 or higher of Java JDK or JRE. You can check your current version by running
```bash
java -version 
```
or get the latest from https://openjdk.java.net/install/.

## Download the latest version of GORpipe
From https://github.com/gorpipe/gor/releases/ you can download the latest GORpipe release and extract the package (gorscripts-<VERSION>-dist.zip) in your preferred location.

## Verify your setup
Now let's make sure you have everything working as expected on your machine by running the following command

```bash
./gorscripts-<VERSION>-dist/bin/gorpipe "gor <(gorrows -p chr1:1000-20000 -segment 100 -step 50 | multimap -cartesian <(norrows 10 | group -lis -sc #1)) | top 10"
```
This command generates some arbitrary  genomicly ordered data on chromosome 1, position 1000-20000, with a column including a list of row numbers. Note that you have to substitute  the <\VERSION\> with the GORpipe version you downloaded.
Your output should look something like this:
```bash
chrom   bpStart bpStop  lis_RowNum
chr1    1000    1100    0,1,2,3,4,5,6,7,8,9
chr1    1050    1150    0,1,2,3,4,5,6,7,8,9
chr1    1100    1200    0,1,2,3,4,5,6,7,8,9
chr1    1150    1250    0,1,2,3,4,5,6,7,8,9
chr1    1200    1300    0,1,2,3,4,5,6,7,8,9
chr1    1250    1350    0,1,2,3,4,5,6,7,8,9
chr1    1300    1400    0,1,2,3,4,5,6,7,8,9
chr1    1350    1450    0,1,2,3,4,5,6,7,8,9
chr1    1400    1500    0,1,2,3,4,5,6,7,8,9
chr1    1450    1550    0,1,2,3,4,5,6,7,8,9
```
## GORpipe interactive shell
To further improve your user experience you can try out the GORpipe interactive shell that comes with your GORpipe download. Simply type
```bash
./gorscripts-<VERSION>-dist/bin/gorshell
```
This will start an interactive shell session enabling you to execute queries directly. The command above would thus be simplified to
```bash
gor <(gorrows -p chr1:1000-20000 -segment 100 -step 50 | multimap -cartesian <(norrows 10 | group -lis -sc #1)) | top 10
```
Wondering what else you can do with the GORpipe tool? Just type help within the GORshell!

## GORpipe and GORshell environment variables
For maximum convenience you can set GORpipe and GORshell as environment variables
```bash
sudo vim /etc/paths
```
and add the follwing line
```bash
<PATH_TO_GOR_SCRIPTS>/bin
````

You are now all set and ready to try out GOR on your tabular genotype and phenotype data.
For further information on the GOR language see the [documentation](https://docs.gorpipe.org/) and checkout [other blog posts](https://gorpipe.org/blog).

Happy GORing!
