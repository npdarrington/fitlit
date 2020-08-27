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
}
if (typeof module !== 'undefined') {
    module.exports = Activity
  }
