
# author: Nadine Balbach (modified code from https://stat.ethz.ch/pipermail/r-help/2012-October/338551.html)
appendRData <- function(robj, filename) {

      tmpEnv <- new.env()
      	
     
        savedObjects <- load(filename, envir = tmpEnv)
        		
       
          # quick check for name collisions
       
        	save(list = c(savedObjects, deparse(substitute(robj))), file = filename, envir = tmpEnv)
        	
        	if((deparse(substitute(robj)) %in% savedObjects))
          	{print(paste(deparse(substitute(robj)), " will be overwritten", sep =""))}
          	
}
