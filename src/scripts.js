let userTitle = document.querySelector('.user-title');
let userName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userFriends = document.querySelector('.friends');
let userStrideLength = document.querySelector('.stride-length');
let userStepGoal = document.querySelector('.user-step-count');
let allUsersStepGoal = document.querySelector('.all-users-step-count');
let waterDrankToday = document.querySelector('.calculated-water-drank')
let weeklyWaterIntake =  document.querySelector('.weekly-hydration')
let dailyHoursSlept = document.querySelector('.daily-hours-slept');
let dailyQualitySleep = document.querySelector('.daily-quality-sleep');
let weeklyHoursSlept = document.querySelector('.weekly-hours-slept');
let weeklyQualitySleep = document.querySelector('.weekly-quality-sleep');
let allTimeHoursSlept = document.querySelector('.all-time-hours-slept');
let allTimeQualitySleep = document.querySelector('.all-time-quality-sleep');
let dailyStepCount = document.querySelector('.daily-step-count')
let dailyMinutesActive = document.querySelector('.daily-minutes-active')
let dailyMilesWalked  = document.querySelector('.daily-miles-walked')
let dailyStepsLeaderBoard = document.querySelector('.number-of-steps-leaderboard')
let dailyminutesActiveLeaderBoard = document.querySelector('.minutes-active-leaderboard')
let dailyStairsClimbed = document.querySelector('.stairs-climbed-leaderboard')
let stepsWeeklyOverview = document.querySelector('.steps-weekly-overview')
let minutesActiveWeeklyOverview = document.querySelector('.minutes-active-weekly-overview')
let flightsOfStairsWeeklyOverview = document.querySelector('.flights-of-stairs-weekly-overview')
let friendLeaderBoard = document.querySelector('.friend-stepcount-leaderboard')
let currentUser;
let indexOfUser  = 1
const getCurrentUser = () => {
  currentUser = new User(allUsers.returnUserData(1));
  return currentUser
}
const allUsers = new UserRepo(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const activity = new Activity(activityData,getCurrentUser())

const populateUserData = currentUser => {
  userTitle.innerText = currentUser.getUserName();
  userName.innerText = currentUser.userData.name;
  userAddress.innerText = currentUser.userData.address;
  userEmail.innerText = currentUser.userData.email;
  userFriends.innerText = currentUser.userData.friends;
  userStrideLength.innerText = currentUser.userData.strideLength;
}

const getUserStepGoal = currentUser => {
  userStepGoal.innerText = currentUser.userData.dailyStepGoal;
}

const getAllUsersStepGoal = () => {
  allUsersStepGoal.innerText = allUsers.returnAverageStepGoalAllUsers();
}

const getUserWaterDrankToday = () => {
  waterDrankToday.innerText = hydration.returnFluidOuncesForSpecificDay(currentUser.userData.id,'2019/06/15');
}
const getUserWaterDrankForTheWeek = () => {
  var UserHydration =  hydration.returnUserWeeklyFluidConsumption(currentUser.userData.id,'2019/06/15');

  UserHydration.forEach( (day) => {
    var WaterIntakeDiv = document.createElement(("div"));
    WaterIntakeDiv.innerText = `${day.date} : ${day.numOunces} ounces`;
    weeklyWaterIntake.appendChild(WaterIntakeDiv);
  });
}

const getUserDailySleepData = () => {
  dailyHoursSlept.innerText = sleep.getUserDailySleepStats(currentUser.userData.id, '2019/06/30','hoursSlept');
  dailyQualitySleep.innerText = sleep.getUserDailySleepStats(currentUser.userData.id, '2019/06/30','sleepQuality');
}

const getUserWeeklyHoursSlept = () => {
  let hoursSleptData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23','hoursSlept');
  hoursSleptData.forEach(day => {
    var hoursSleptDiv = document.createElement('div');
    hoursSleptDiv.innerText = `${day.date} : ${day.hoursSlept}`;
    weeklyHoursSlept.appendChild(hoursSleptDiv);
  });
}

const getUserWeeklySleepQuality = () => {
  let sleepQualityData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23','sleepQuality');
  sleepQualityData.forEach(day => {
    var sleepQualityDiv = document.createElement('div');
    sleepQualityDiv.innerText = `${day.date} : ${day.sleepQuality}`;
    weeklyQualitySleep.appendChild(sleepQualityDiv);
  });
}

const getUserAllTimeSleepData = () => {
  allTimeHoursSlept.innerText = sleep.getUserAverageSleptHoursPerDay(currentUser.userData.id);
  allTimeQualitySleep.innerText = sleep.getUserAverageSleepQualityAllTime(currentUser.userData.id);
}

const getDailyActivityData = () =>{
  dailyStepCount.innerText = `${activity.data[indexOfUser-1].numSteps} steps `
  dailyMinutesActive.innerText = `${activity.data[indexOfUser-1].minutesActive} minutes active `
  dailyMilesWalked.innerText = `${activity.returnMilesWalkedForGivenDay(indexOfUser,'2019/06/30')} miles walked`
}
const generateLeaderboard = (activityForLeaderBoard,date) =>{
  let singleDay = activity.data.filter(user => {
    return user.date === date;
  });
  let sortedArray = singleDay.sort((user,nextUser)=>{
    return nextUser[activityForLeaderBoard] - user[activityForLeaderBoard]
  })
  return sortedArray
}
const addDailyStepleaderBoard = () =>{
let sortedArray = generateLeaderboard('numSteps',"2019/06/28")
sortedArray.forEach((user,i) =>{
  if(i<=5){
    let userSection = document.createElement('div');
    userSection.innerText = `${i+1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.numSteps}`;
    dailyStepsLeaderBoard.appendChild(userSection)
  }
})
}
const addDailyminutesActiveBoard = () =>{
  let sortedArray = generateLeaderboard('minutesActive',"2019/06/28")
sortedArray.forEach((user,i) =>{
  if(i<5){
    let userSection = document.createElement('div');
    userSection.innerText = `${i+1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.minutesActive}`;
    dailyminutesActiveLeaderBoard.appendChild(userSection)
  }
})
}
const addDailyStairClimbedBoard = () =>{
  let sortedArray = generateLeaderboard('flightsOfStairs',"2019/06/28")
sortedArray.forEach((user,i) =>{
  if(i<=5){
    let userSection = document.createElement('div');
    userSection.innerText = `${i+1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.flightsOfStairs}`;
    dailyStairsClimbed.appendChild(userSection)
  }
})
}
const putWeeklyOverViewOnDom = (stepCountOverView,activity,domElement) => {
  stepCountOverView.forEach(date =>{
    let userSection = document.createElement('div');
    let sufix;
    if(activity === 'numSteps'){
      sufix = 'Steps'
    }
    else if(activity === 'minutesActive'){
      sufix = 'Minutes Active'

    }
    else{
      sufix = 'Stairs'
    }
    userSection.innerText = `${date.date} : ${date[activity]} ${sufix}`;
    domElement.appendChild(userSection)
  })
}
const getWeeklyOverview = () => {
  putWeeklyOverViewOnDom(activity.returnActvityWeeklyOverview(indexOfUser,"2019/06/28",'numSteps'),'numSteps',stepsWeeklyOverview)
  putWeeklyOverViewOnDom(activity.returnActvityWeeklyOverview(indexOfUser,"2019/06/28",'minutesActive'),'minutesActive',minutesActiveWeeklyOverview)
  putWeeklyOverViewOnDom(activity.returnActvityWeeklyOverview(indexOfUser,"2019/06/28",'flightsOfStairs'),'flightsOfStairs',flightsOfStairsWeeklyOverview)

  }
const createFriendsLeaderBoard = () =>{
let sortedArray = generateLeaderboard('numSteps',"2019/06/28")
let friends = sortedArray.filter(user => {
  return currentUser.userData.friends.includes(user.userID) || user.userID === indexOfUser
   
})
return friends
}
const createFriendsSection = () => {
  var friends = createFriendsLeaderBoard () 
  friends.forEach(user =>{
    var friendSection = document.createElement('div')
    if(user.userID === indexOfUser ){
      friendSection.innerText = `You : ${user.numSteps}`

    }else{
   
    friendSection.innerText = `${allUsers.userData[user.userID].name}: ${user.numSteps}`
  }
    friendLeaderBoard.appendChild(friendSection)
  })
}
window.onload = () => {
  getCurrentUser(userData);
  populateUserData(currentUser);
  getUserStepGoal(currentUser);
  getAllUsersStepGoal();
  getUserWaterDrankToday();
  getUserWaterDrankForTheWeek();
  getUserDailySleepData();
  getUserWeeklyHoursSlept();
  getUserWeeklySleepQuality();
  getUserAllTimeSleepData();
  getDailyActivityData()
  addDailyStepleaderBoard()
  addDailyminutesActiveBoard()
  addDailyStairClimbedBoard()
  getWeeklyOverview()
  createFriendsSection()
};