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
let currentUser;
const allUsers = new UserRepo(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const getCurrentUser = userData => {
  currentUser = new User(allUsers.returnUserData(1));
}

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
  waterDrankToday.innerText = hydration.returnFluidOuncesForSpecificDay(1,'2019/06/15')
}
const getUserWaterDrankForTheWeek = () => {
  var UserHydration =  hydration.returnUserWeeklyFluidConsumption(1,'2019/06/15')

UserHydration.forEach( (day) => {
var WaterIntakeDiv = document.createElement(("div"))
console.log(WaterIntakeDiv)
WaterIntakeDiv.innerText = `${day.date} : ${day.numOunces} ounces`
weeklyWaterIntake.appendChild(WaterIntakeDiv)
})
}

const getUserDailySleepData = () => {
  dailyHoursSlept.innerText = sleep.getSleepHoursForSpecificDay(1, '2019/06/30');
  dailyQualitySleep.innerText = sleep.getSleepQualityForSpecificDay(1, '2019/06/30');
}

window.onload = () => {
  getCurrentUser(userData);
  populateUserData(currentUser);
  getUserStepGoal(currentUser);
  getAllUsersStepGoal();
  getUserWaterDrankToday()
  getUserWaterDrankForTheWeek()
  getUserDailySleepData();
};


// console.log("Hello World");