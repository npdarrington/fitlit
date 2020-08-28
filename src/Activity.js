const User = require('./User.js')
const UserRepo = require('./userRepo.js')
const userTestData = require('../test/userTestData.js')
let allUsers = new UserRepo(userTestData);
class Activity {
    constructor(ActivityTestData){
        this.data = ActivityTestData
    }
    returnMilesWalkedForGivenDay(userId,date){

        let user = new User(allUsers.returnUserData(userId));

        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
         let singleDay =  singleUserData.filter(user =>{
              return user.date === date
          })
        let userNumberStepsPerMile = Math.round(5280/user.userData.strideLength)
        let milesWalked = singleDay[0].numSteps / userNumberStepsPerMile
        return Math.round(milesWalked *100) /100

    }
    returnMinutesWalkedForGivenDay(userId,date){

        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
         let singleDay =  singleUserData.filter(user =>{
              return user.date === date
          })
          return singleDay[0].minutesActive
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
        let user = new User(allUsers.returnUserData(userId));
        let userStepGoal = user.userData.dailyStepGoal
        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
          
        let singleDay =  singleUserData.filter(user =>{
            return user.date === date
        })
       
        return singleDay[0].numSteps > userStepGoal
    }
    returnAllDaysAUserReachedTheirStepGoal(userId){
        let user = new User(allUsers.returnUserData(userId));
        let userStepGoal = user.userData.dailyStepGoal
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

        // let daysWithEqulavlentOrHighernumSteps = this.data.filter(user => {
        //     return user.numSteps >= userStepGoal
        // })
        // let daysWithEqulavlentOrHighernumSteps = this.data.map(user =>{
        //     var obj = {}
        //     obj.
        //     return 
        // })
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
