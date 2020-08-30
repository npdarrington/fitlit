class Activity {
    constructor(ActivityTestData,user){
        this.data = ActivityTestData
        this.user =user
    }
    returnMilesWalkedForGivenDay(userId,date){
        let user = this.user.userData
        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
         let singleDay =  singleUserData.filter(user =>{
              return user.date === date
          })
        let userNumberStepsPerMile = Math.round(5280/user.strideLength)
        let milesWalked = singleDay[0].numSteps / userNumberStepsPerMile
        return Math.round(milesWalked *100) /100

    }
    returnMinutesActiveForGivenDay(userId,date){

        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
         let singleDay =  singleUserData.filter(user =>{
              return user.date === date
          })
          return singleDay[0].minutesActive
    }
    returnActvityWeeklyOverview(userId,date,activity){
        let singleUserData = this.data.filter(user => { 
            return user.userID === userId
        })
        console.log(singleUserData)
       let dateObject =  singleUserData.find(user => user.date === date )
       console.log(dateObject)
       let indexOfstartDateObject = singleUserData.indexOf(dateObject)
       console.log(indexOfstartDateObject)
       var userActivity = singleUserData.map(user =>{
           var dataAndNumOfOuncesDrank = {}
           dataAndNumOfOuncesDrank.date  = user.date;
           dataAndNumOfOuncesDrank[activity] =  user[activity];
                 return dataAndNumOfOuncesDrank
       })
       console.log(userActivity)
       var splicedArray = userActivity.slice(indexOfstartDateObject -7,indexOfstartDateObject+1 ).reverse()
        return splicedArray
    }
    returnAverageActiveMinutesForWeek(userId,startDate){
        let singleUserData = this.data.filter(user => { 
            return user.userID === userId
        })
       var startDateObject =  singleUserData.find(user => user.date === startDate )
       let indexOfstartDateObject = singleUserData.indexOf(startDateObject)
       let minutesActive = singleUserData.map(user =>{
          return user.minutesActive
       })
       let weeklyMinutesActive = minutesActive.splice(indexOfstartDateObject,7)
      let totalMinutesActive =  weeklyMinutesActive.reduce((acc,curr)=>{
           return acc+=curr
       },0)
       return totalMinutesActive / 7

    }
    returnIfUserReachedStepGoalForDay(userId,date){
        let user = this.user.userData
        let userStepGoal = user.dailyStepGoal
        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
          
        let singleDay =  singleUserData.filter(user =>{
            return user.date === date
        })
       
        return singleDay[0].numSteps > userStepGoal
    }
    returnAllDaysAUserReachedTheirStepGoal(userId){
        let user = this.user.userData
        let userStepGoal = user.dailyStepGoal
        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
        return singleUserData.reduce((acc,user) =>{
            if(user.numSteps >= userStepGoal){
                let obj = {}
                obj.date = user.date
                obj.numSteps = user.numSteps
                acc.push(obj)
                return acc
            }
            return acc
        },[])

    }
    returnAlltimeStairClimbingRecord(userId){
        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
          let allUserStairsClimbed = singleUserData.map(date =>{
              return date.flightsOfStairs
          })
          let allUserStairsClimbedSorted = allUserStairsClimbed.sort((a,b)=>{
              return b-a
          })
          return allUserStairsClimbedSorted[0]
    }
    returnAverageNumberOfStairsClimbedForDay(date){
       let singleDay = this.data.filter(user => {
            return user.date === date;
          });
        let stairsClimbedInDay =  singleDay.map(user =>{
            return user.flightsOfStairs
        })
        let totalStairsClimbed = stairsClimbedInDay.reduce((acc,curr)=>{
            return acc +=curr
        },0)
        let totalNumberOfUsers = this.findTotalNumberofUsers()

        return Math.round(totalStairsClimbed / totalNumberOfUsers)
    }
    returnAverageNumberOfStepsTakenForDay(date){
        let singleDay = this.data.filter(user => {
            return user.date === date;
          });
        let stepsInDay =  singleDay.map(user =>{
            return user.numSteps
        })
        let totalStepsInDay = stepsInDay.reduce((acc,curr)=>{
            return acc +=curr
        },0)

        let totalNumberOfUsers = this.findTotalNumberofUsers()
        return Math.round(totalStepsInDay / totalNumberOfUsers)
    }
    returnAverageNumberOfMinutesActiveForDay(date){
        let singleDay = this.data.filter(user => {
            return user.date === date;
          });
        let minutesActiveInDay =  singleDay.map(user =>{
            return user.minutesActive
        })
        let totalMinutesActiveInDay = minutesActiveInDay.reduce((acc,curr)=>{
            return acc +=curr
        },0)

        let totalNumberOfUsers = this.findTotalNumberofUsers()
        return Math.round(totalMinutesActiveInDay / totalNumberOfUsers)
    }
    findTotalNumberofUsers(){
       return new Set (this.data.map((user =>{
            return user.userID
        }))).size
    }

}
if (typeof module !== 'undefined') {
    module.exports = Activity
  }
