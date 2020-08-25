class userRepo {
    constructor(userData){
        this.userData = userData
    }
    returnUserData(number){
        return this.userData.find(user => user.id === number)
        
    }
    returnAverageStepCount(){
    var stepCountGoalTotal = this.userData.reduce((startingValue,user) => {
            return startingValue + user.dailyStepGoal 
    },0)
    return stepCountGoalTotal / this.userData.length
}

}
module.exports = userRepo