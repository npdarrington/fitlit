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
       
        return singleDay[0].numSteps > userStepGoal
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
        let totalNumberOfUsers = this.findTotalNumberofUser()

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

        let totalNumberOfUsers = this.findTotalNumberofUser()

        console.log( Math.round(totalStepsInDay / totalNumberOfUsers))
        return Math.round(totalStepsInDay / totalNumberOfUsers)
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
