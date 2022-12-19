library(tidyr)
library(ggplot2)
library(gridExtra)
library(trimr)
library(lme4)
library(lmerTest)
library(sjPlot)
library(ggbreak)
library(Rmisc)

rm(list=ls())


plots_dir<- file.path(getwd(),"plots")
if(!dir.exists(plots_dir)) dir.create(plots_dir, recursive = TRUE, showWarnings = FALSE)


subj_info <- read.csv(file = file.path("..", "data", "kammertenberg_subj_info.csv"))

data <- read.csv(file = file.path("..", "data", "kammertenberg.csv"))

head(data, n=5)

sum(xtabs(~id, data=data)/148)
xtabs(~item+context, data=data)
#...

#subset
#data <- subset(...)

#encoding etc...

##split rt list
#get list
rt_as_lists <- with(data, strsplit(gsub("\\[|\\]", "", read_time), ", "))


#  Find length of each list element
len <- sapply(rt_as_lists,length)

cbind(rt_as_lists,len)

#  Longest gives number of rows
n <- max( len )

#  Number of NAs to fill for column shorter than longest
len <- n - len

#  Output
rt_as_lists_with_na <- t(mapply( function(x,y) c( x , rep( NA , y ) ) , rt_as_lists , len ))

rt <- as.data.frame(rt_as_lists_with_na)

names(rt) <- paste("rt", formatC(seq(0,length(rt)-1,1), width=2, flag="0"), sep= ".")

data_with_rt <- cbind(data[,1:11], rt, data[,12:12])

#check for extra reading times
#data_with_rt[!is.na(data_with_rt$rt.06),c("id","read_time")]


#encode roi as factor
data <- gather(data_with_rt, roi, rt, rt.00:rt.05)

head(data)

data$pictureRT <- as.numeric(data$pictureRT)
data$rt <- as.numeric(data$rt)

save(data, file = "data.RData")
load("data.RData")


#some sanity check  
xtabs(~id, data)

empty_set_data <- subset(data, item <= 64)

xtabs(~id+condition, empty_set_data)

aggregate(empty_set_data$pictureRT, list(empty_set_data$empty_set_quantifier, empty_set_data$model, empty_set_data$condition), function(x){c(mean(x, na.rm=TRUE),sd(x,na.rm=TRUE))})

