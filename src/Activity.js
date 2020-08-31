class Activity {
  constructor(ActivityTestData, user) {
    this.data = ActivityTestData
    this.user = user
  }
  returnMilesWalkedForGivenDay(userId, date) {
    let user = this.user.userData[userId - 1]
    let singleUserData = this.data.filter(user => {
      return user.userID === userId;
    });
    let singleDay =  singleUserData.filter(user =>{
      return user.date === date
    })
    let userNumberStepsPerMile = Math.round(5280 / user.strideLength)
    let milesWalked = singleDay[0].numSteps / userNumberStepsPerMile
    return Math.round(milesWalked * 100) / 100
  }
  returnMinutesActiveForGivenDay(userId, date) {
    let singleUserData = this.data.filter(user => {
      return user.userID === userId;
    });
    let singleDay =  singleUserData.filter(user =>{
      return user.date === date
    })
    return singleDay[0].minutesActive
  }
  returnActvityWeeklyOverview(userId, date, activity) {
    let singleUserData = this.data.filter(user => { 
      return user.userID === userId
    })
    let dateObject =  singleUserData.find(user => user.date === date )
    let indexOfstartDateObject = singleUserData.indexOf(dateObject)
    var userActivity = singleUserData.map(user =>{
      var dataAndNumOfOuncesDrank = {}
      dataAndNumOfOuncesDrank.date  = user.date;
      dataAndNumOfOuncesDrank[activity] =  user[activity];
      return dataAndNumOfOuncesDrank
    })
    var splicedArray = userActivity.slice(indexOfstartDateObject - 7, indexOfstartDateObject + 1 ).reverse()
    return splicedArray
  }
  returnIfUserReachedStepGoalForDay(userId, date) {
    let user = this.user.userData[userId -1]
    let userStepGoal = user.dailyStepGoal
    let singleUserData = this.data.filter(user => {
      return user.userID === userId;
    });
          
    let singleDay =  singleUserData.filter(user =>{
      return user.date === date
    })
    return singleDay[0].numSteps > userStepGoal
  }
  returnAllDaysAUserReachedTheirStepGoal(userId) {
    let user = this.user.userData[userId-1]
    let userStepGoal = user.dailyStepGoal
    let singleUserData = this.data.filter(user => {
      return user.userID === userId;
    });
    return singleUserData.reduce((acc, user) =>{
      if (user.numSteps >= userStepGoal) {
        let obj = {}
        obj.date = user.date
        obj.numSteps = user.numSteps
        acc.push(obj)
        return acc
      }
      return acc
    }, [])
  }
  returnAlltimeStairClimbingRecord(userId) {
    let singleUserData = this.data.filter(user => {
      return user.userID === userId;
    });
    let allUserStairsClimbed = singleUserData.map(date =>{
      return date.flightsOfStairs
    })
    let allUserStairsClimbedSorted = allUserStairsClimbed.sort((a, b)=>{
      return b - a
    })
    return allUserStairsClimbedSorted[0]
  }
  returnAverageNumberofActivityForDay(date, activity) {
    let singleDay = this.data.filter(user => {
      return user.date === date;
    });
    let stepsInDay =  singleDay.map(user =>{
      return user[activity]
    })
    let totalActivityInDay = stepsInDay.reduce((acc, curr)=>{
      return acc += curr
    }, 0)

    let totalNumberOfUsers = this.findTotalNumberofUsers()
    return Math.round(totalActivityInDay / totalNumberOfUsers)
  }
  findTotalNumberofUsers() {
    return new Set (this.data.map((user =>{
      return user.userID
    }))).size
  }
}
if (typeof module !== 'undefined') {
  module.exports = Activity
}
