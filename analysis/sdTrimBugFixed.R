sdTrimBugFixed <- function (data, minRT, sd, perCondition = TRUE, perParticipant = TRUE, 
                   omitErrors = TRUE, returnType = "mean", digits = 3) 
{
  if (perCondition == FALSE & perParticipant == FALSE) {
    stDev <- sd
    if (omitErrors == TRUE) {
      trimmedData <- subset(data, data$accuracy == 1)
    }
    else {
      trimmedData <- data
    }
    participant <- sort(unique(trimmedData$participant))
    conditionList <- unique(trimmedData$condition)
    trimmedData <- subset(trimmedData, trimmedData$rt > minRT)
    meanRT <- mean(trimmedData$rt)
    sdRT <- sd(trimmedData$rt)
    cutoff <- meanRT + (stDev * sdRT)
    trimmedData <- subset(trimmedData, trimmedData$rt < cutoff)
    if (returnType == "raw") {
      return(trimmedData)
    }
    if (returnType == "mean") {
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      j <- 2
      for (currCondition in conditionList) {
        tempData <- subset(trimmedData, trimmedData$condition == 
                             currCondition)
        i <- 1
        for (currParticipant in participant) {
          participantData <- subset(tempData, tempData$participant == 
                                      currParticipant)
          finalData[i, j] <- round(mean(participantData$rt), 
                                   digits = digits)
          i <- i + 1
        }
        j <- j + 1
      }
      return(finalData)
    }
    if (returnType == "median") {
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      j <- 2
      for (currCondition in conditionList) {
        tempData <- subset(trimmedData, trimmedData$condition == 
                             currCondition)
        i <- 1
        for (currParticipant in participant) {
          participantData <- subset(tempData, tempData$participant == 
                                      currParticipant)
          finalData[i, j] <- round(median(participantData$rt), 
                                   digits = digits)
          i <- i + 1
        }
        j <- j + 1
      }
      return(finalData)
    }
  }
  if (perCondition == TRUE & perParticipant == FALSE) {
    stDev <- sd
    if (omitErrors == TRUE) {
      trimmedData <- subset(data, data$accuracy == 1)
    }
    else {
      trimmedData <- data
    }
    participant <- sort(unique(trimmedData$participant))
    conditionList <- unique(trimmedData$condition)
    trimmedData <- subset(trimmedData, trimmedData$rt > minRT)
    if (returnType == "raw") {
      finalData <- NULL
      for (cond in conditionList) {
        curData <- subset(trimmedData, trimmedData$condition == 
                            cond)
        curMean <- mean(curData$rt)
        curSD <- sd(curData$rt)
        curCutoff <- curMean + (stDev * curSD)
        curData <- subset(curData, curData$rt < curCutoff)
        finalData <- rbind(finalData, curData)
      }
      return(finalData)
    }
    if (returnType == "mean") {
      tempData <- NULL
      for (cond in conditionList) {
        curData <- subset(trimmedData, trimmedData$condition == 
                            cond)
        curMean <- mean(curData$rt)
        curSD <- sd(curData$rt)
        curCutoff <- curMean + (stDev * curSD)
        curData <- subset(curData, curData$rt < curCutoff)
        tempData <- rbind(tempData, curData)
      }
      trimmedData <- tempData
      tempData <- NULL
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      j <- 2
      for (curCondition in conditionList) {
        tempData <- subset(trimmedData, trimmedData$condition == 
                             curCondition)
        i <- 1
        for (currParticipant in participant) {
          participantData <- subset(tempData, tempData$participant == 
                                      currParticipant)
          finalData[i, j] <- round(mean(participantData$rt), 
                                   digits = digits)
          i <- i + 1
        }
        j <- j + 1
      }
      return(finalData)
    }
  }
  if (perCondition == FALSE & perParticipant == TRUE) {
    stDev <- sd
    if (omitErrors == TRUE) {
      trimmedData <- subset(data, data$accuracy == 1)
    }
    else {
      trimmedData <- data
    }
    participant <- sort(unique(trimmedData$participant))
    conditionList <- unique(trimmedData$condition)
    trimmedData <- subset(trimmedData, trimmedData$rt > minRT)
    if (returnType == "raw") {
      finalData <- NULL
      for (currSub in participant) {
        curData <- subset(trimmedData, trimmedData$participant == 
                            currSub)
        curMean <- mean(curData$rt)
        curSD <- sd(curData$rt)
        curCutoff <- curMean + (stDev * curSD)
        curData <- subset(curData, curData$rt < curCutoff)
        finalData <- rbind(finalData, curData)
      }
      return(finalData)
    }
    if (returnType == "mean") {
      tempData <- NULL
      for (currSub in participant) {
        curData <- subset(trimmedData, trimmedData$participant == 
                            currSub)
        curMean <- mean(curData$rt)
        curSD <- sd(curData$rt)
        curCutoff <- curMean + (stDev * curSD)
        curData <- subset(curData, curData$rt < curCutoff)
        tempData <- rbind(tempData, curData)
      }
      trimmedData <- tempData
      tempData <- NULL
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      j <- 2
      for (curCondition in conditionList) {
        tempData <- subset(trimmedData, trimmedData$condition == 
                             curCondition)
        i <- 1
        for (currParticipant in participant) {
          participantData <- subset(tempData, tempData$participant == 
                                      currParticipant)
          finalData[i, j] <- round(mean(participantData$rt), 
                                   digits = digits)
          i <- i + 1
        }
        j <- j + 1
      }
      return(finalData)
    }
    if (returnType == "median") {
      tempData <- NULL
      for (currSub in participant) {
        curData <- subset(trimmedData, trimmedData$participant == 
                            currSub)
        curMean <- mean(curData$rt)
        curSD <- sd(curData$rt)
        curCutoff <- curMean + (stDev * curSD)
        curData <- subset(curData, curData$rt < curCutoff)
        tempData <- rbind(tempData, curData)
      }
      trimmedData <- tempData
      tempData <- NULL
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      j <- 2
      for (curCondition in conditionList) {
        tempData <- subset(trimmedData, trimmedData$condition == 
                             curCondition)
        i <- 1
        for (currParticipant in participant) {
          participantData <- subset(tempData, tempData$participant == 
                                      currParticipant)
          finalData[i, j] <- round(median(participantData$rt), 
                                   digits = digits)
          i <- i + 1
        }
        j <- j + 1
      }
      return(finalData)
    }
  }
  if (perCondition == TRUE & perParticipant == TRUE) {
    stDev <- sd
    if (omitErrors == TRUE) {
      trimmedData <- subset(data, data$accuracy == 1)
    }
    else {
      trimmedData <- data
    }
    participant <- sort(unique(trimmedData$participant))
    conditionList <- unique(trimmedData$condition)
    trimmedData <- subset(trimmedData, trimmedData$rt > minRT)
    if (returnType == "raw") {
      finalData <- NULL
      for (currSub in participant) {
        for (currCond in conditionList) {
          tempData <- subset(trimmedData, trimmedData$condition == 
                               currCond & trimmedData$participant == currSub)
          curMean <- mean(tempData$rt)
          curSD <- sd(tempData$rt)
          curCutoff <- curMean + (stDev * curSD)
          curData <- subset(tempData, tempData$rt < curCutoff)
          #bug fixed
          finalData <- rbind(finalData, curData)
        }
      }
      return(finalData)
    }
    if (returnType == "mean") {
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      i <- 1
      for (currSub in participant) {
        j <- 2
        for (currCond in conditionList) {
          tempData <- subset(trimmedData, trimmedData$participant == 
                               currSub & trimmedData$condition == currCond)
          curMean <- mean(tempData$rt)
          curSD <- sd(tempData$rt)
          curCutoff <- curMean + (stDev * curSD)
          curData <- subset(tempData, tempData$rt < curCutoff)
          finalData[i, j] <- round(mean(curData$rt), 
                                   digits = digits)
          j <- j + 1
        }
        i <- i + 1
      }
      return(finalData)
    }
    if (returnType == "median") {
      finalData <- matrix(0, nrow = length(participant), 
                          ncol = length(conditionList))
      colnames(finalData) <- conditionList
      finalData <- cbind(participant, finalData)
      finalData <- data.frame(finalData)
      i <- 1
      for (currSub in participant) {
        j <- 2
        for (currCond in conditionList) {
          tempData <- subset(trimmedData, trimmedData$participant == 
                               currSub & trimmedData$condition == currCond)
          curMean <- mean(tempData$rt)
          curSD <- sd(tempData$rt)
          curCutoff <- curMean + (stDev * curSD)
          curData <- subset(tempData, tempData$rt < curCutoff)
          finalData[i, j] <- round(median(curData$rt), 
                                   digits = digits)
          j <- j + 1
        }
        i <- i + 1
      }
      return(finalData)
    }
  }
}
