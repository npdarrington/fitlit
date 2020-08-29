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
  dailyHoursSlept.innerText = sleep.getSleepHoursForSpecificDay(currentUser.userData.id, '2019/06/30');
  dailyQualitySleep.innerText = sleep.getSleepQualityForSpecificDay(currentUser.userData.id, '2019/06/30');
}

const getUserWeeklyHoursSlept = () => {
  let hoursSleptData = sleep.getHoursSleptPerDayForWeek(currentUser.userData.id, '2019/06/23');
  hoursSleptData.forEach(day => {
    var hoursSleptDiv = document.createElement('div');
    hoursSleptDiv.innerText = `${day.date} : ${day.hoursSlept}`;
    weeklyHoursSlept.appendChild(hoursSleptDiv);
  });
}

const getUserWeeklySleepQuality = () => {
  let sleepQualityData = sleep.getUserSleepQualityPerDayForWeek(currentUser.userData.id, '2019/06/23');
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
  console.log('day',singleDay)
  let sortedArray = singleDay.sort((user,nextUser)=>{
    return nextUser[activityForLeaderBoard] - user[activityForLeaderBoard]
  })
  console.log(`${activityForLeaderBoard}`,sortedArray)
  return sortedArray
}
const addDailyStepleaderBoard = () =>{
let sortedArray = generateLeaderboard('numSteps',"2019/06/28")
console.log('sorted array',sortedArray )
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
};