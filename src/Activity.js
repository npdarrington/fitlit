const User = require('./User.js')
const userTestData = require('../test/userTestData.js')
class Activity {
    constructor(ActivityTestData){
        this.data = ActivityTestData
    }
    returnMilesWalkedForGivenDay(userId,date){
        const user = new User(userId)

        let singleUserData = this.sleepData.filter(user => {
            return user.userID === userId;
          });
         var SingleDay =  singleUserData.filter(user =>{
              return user.date === date
          })
        let UserNumberStepsPerMile = 5280/user.strideLength
          
        let milesWalked = SingleDay.stepsTaken / UserNumberStepsPerMile
        return milesWalked

    }
}