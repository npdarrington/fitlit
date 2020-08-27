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
    returnAverageActiveMinutesForWeek(){

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
        console.log(singleDay[0].numSteps)
        console.log(userStepGoal)
        return singleDay[0].numSteps > userStepGoal
    }
    returnAlltimeStairClimbingRecord(userId){
        let singleUserData = this.data.filter(user => {
            return user.userID === userId;
          });
          let allUserStairsClimbed = singleUserData.map(date =>{
              return date.flightsOfStairs
          })
          console.log(allUserStairsClimbed)
          let allUserStairsClimbedSorted = allUserStairsClimbed.sort((a,b)=>{
              return b-a
          })
          console.log(allUserStairsClimbedSorted)
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
        let totalNumberOfUsers = this.findTotalNumberofUser()

        return Math.round(totalStairsClimbed / totalNumberOfUsers)
    }
    findTotalNumberofUser(){
       return new Set (this.data.map((user =>{
            return user.userID
        }))).size
    }
}
if (typeof module !== 'undefined') {
    module.exports = Activity
  }
