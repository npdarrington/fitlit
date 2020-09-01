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
let hydrationGraph = document.querySelector('#hydration-stats');
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

// const populateUserData = currentUser => {
//   userTitle.innerText = currentUser.getUserName();
//   userName.innerText = currentUser.userData.name;
//   userAddress.innerText = currentUser.userData.address;
//   userEmail.innerText = currentUser.userData.email;
//   userFriends.innerText = currentUser.userData.friends;
//   userStrideLength.innerText = currentUser.userData.strideLength;
// }

// const getUserStepGoal = currentUser => {
//   userStepGoal.innerText = currentUser.userData.dailyStepGoal;
// }

// const getAllUsersStepGoal = () => {
//   allUsersStepGoal.innerText = allUsers.returnAverageStepGoalAllUsers();
// }

// const getUserWaterDrankToday = () => {
//   waterDrankToday.innerText = hydration.returnFluidOuncesForSpecificDay(currentUser.userData.id,'2019/06/15');
// }

const getUserWaterDrankForTheWeek = () => {
  var UserHydration =  hydration.returnUserWeeklyFluidConsumption(currentUser.userData.id, '2019/06/15');
  displayHydrationGraph(UserHydration);
}

// const getUserDailySleepData = () => {
//   dailyHoursSlept.innerText = sleep.getUserDailySleepStats(currentUser.userData.id, '2019/06/30','hoursSlept');
//   dailyQualitySleep.innerText = sleep.getUserDailySleepStats(currentUser.userData.id, '2019/06/30','sleepQuality');
// }

// const getUserWeeklyHoursSlept = () => {
//   let hoursSleptData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23','hoursSlept');
//   hoursSleptData.forEach(day => {
//     var hoursSleptDiv = document.createElement('div');
//     hoursSleptDiv.innerText = `${day.date} : ${day.hoursSlept}`;
//     weeklyHoursSlept.appendChild(hoursSleptDiv);
//   });
// }

const getUserWeeklySleepQuality = () => {
  let sleepQualityData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23', 'sleepQuality');
  const sleepHoursSleptData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23', 'hoursSlept');
  sleepQualityData.forEach((user, index) => {
    user.hoursSlept = sleepHoursSleptData[index].hoursSlept;
  });
  let changeChallengeBoardTitle = document.querySelector('.challenge-board-title');
  changeChallengeBoardTitle.innerText = 'Weekly Sleep Stats';
  playWithTheTable(sleepQualityData);
}

// const getUserAllTimeSleepData = () => {
//   allTimeHoursSlept.innerText = sleep.getUserAverageSleptHoursPerDay(currentUser.userData.id);
//   allTimeQualitySleep.innerText = sleep.getUserAverageSleepQualityAllTime(currentUser.userData.id);
// }

// const getDailyActivityData = () =>{
//   dailyStepCount.innerText = `${activity.data[indexOfUser-1].numSteps} steps `
//   dailyMinutesActive.innerText = `${activity.data[indexOfUser-1].minutesActive} minutes active `
//   dailyMilesWalked.innerText = `${activity.returnMilesWalkedForGivenDay(indexOfUser,'2019/06/30')} miles walked`
// }
// const generateLeaderboard = (activityForLeaderBoard,date) =>{
//   let singleDay = activity.data.filter(user => {
//     return user.date === date;
//   });
//   let sortedArray = singleDay.sort((user,nextUser)=>{
//     return nextUser[activityForLeaderBoard] - user[activityForLeaderBoard]
//   })
//   return sortedArray
// }
// const addDailyStepleaderBoard = () =>{
// let sortedArray = generateLeaderboard('numSteps',"2019/06/28")
// sortedArray.forEach((user,i) =>{
//   if(i<=5){
//     let userSection = document.createElement('div');
//     userSection.innerText = `${i+1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.numSteps}`;
//     dailyStepsLeaderBoard.appendChild(userSection)
//   }
// })
// }
// const addDailyminutesActiveBoard = () =>{
//   let sortedArray = generateLeaderboard('minutesActive',"2019/06/28")
// sortedArray.forEach((user,i) =>{
//   if(i<5){
//     let userSection = document.createElement('div');
//     userSection.innerText = `${i+1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.minutesActive}`;
//     dailyminutesActiveLeaderBoard.appendChild(userSection)
//   }
// })
// }
// const addDailyStairClimbedBoard = () =>{
//   let sortedArray = generateLeaderboard('flightsOfStairs',"2019/06/28")
// sortedArray.forEach((user,i) =>{
//   if(i<=5){
//     let userSection = document.createElement('div');
//     userSection.innerText = `${i+1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.flightsOfStairs}`;
//     dailyStairsClimbed.appendChild(userSection)
//   }
// })
// }
// const putWeeklyOverViewOnDom = (stepCountOverView,activity,domElement) => {
//   stepCountOverView.forEach(date =>{
//     let userSection = document.createElement('div');
//     let sufix;
//     if(activity === 'numSteps'){
//       sufix = 'Steps'
//     }
//     else if(activity === 'minutesActive'){
//       sufix = 'Minutes Active'

//     }
//     else{
//       sufix = 'Stairs'
//     }
//     userSection.innerText = `${date.date} : ${date[activity]} ${sufix}`;
//     domElement.appendChild(userSection)
//   })
// }
// const getWeeklyOverview = () => {
//   putWeeklyOverViewOnDom(activity.returnActvityWeeklyOverview(indexOfUser,"2019/06/28",'numSteps'),'numSteps',stepsWeeklyOverview)
//   putWeeklyOverViewOnDom(activity.returnActvityWeeklyOverview(indexOfUser,"2019/06/28",'minutesActive'),'minutesActive',minutesActiveWeeklyOverview)
//   putWeeklyOverViewOnDom(activity.returnActvityWeeklyOverview(indexOfUser,"2019/06/28",'flightsOfStairs'),'flightsOfStairs',flightsOfStairsWeeklyOverview)

//   }

// const createFriendsSection = () => {
//   let friends = allUsers.userData.filter(user => {
//       return currentUser.userData.friends.includes(user.id) || user.id === indexOfUser
//     })
//   let friendsWeeklySteps = findFriendsWeeklySteps(friends)
//   var stepCounts =  findUserStepCounts(friendsWeeklySteps)

//   var sortedSteps = stepCounts.sort((firstValue,secondValue) => {
//   return secondValue.steps - firstValue.steps
//   })
//   addFriendsToHtml(sortedSteps)
// }
// findFriendsWeeklySteps = (friends) =>{
//   return friends.map(user => {
//     return { 
//       id : user.id,
//       date : activity.returnActvityWeeklyOverview(user.id,"2019/06/28",'numSteps')
//     }
//   })
// }
// addFriendsToHtml = (sortedSteps) =>{
//   sortedSteps.forEach(user =>{
//     var friendSection = document.createElement('div')
//     if(user.id === indexOfUser ){
//       friendSection.innerText = `You : ${user.steps} steps`

//     }else{
//     friendSection.innerText = `${allUsers.userData[user.id-1].name}: ${user.steps} steps`
//   }
//     friendLeaderBoard.appendChild(friendSection)
//   })
// }
// findUserStepCounts = (friendsWeeklySteps) => {
//   return friendsWeeklySteps.map(userSteps =>{
//     var obj = {}
//     obj.id = userSteps.id
//     obj.steps =  userSteps.date.reduce((startingValue,date) =>{
//       return startingValue += date.numSteps
//     },0)
//     return obj
//   })
// }

const playWithTheTable = allStats => {
  console.log(allStats);
  let displayFriendsResultsHead = document.querySelector('.display-friends-results > thead');
  let displayFriendsResultsBody = document.querySelector('.display-friends-results > tbody');
  let displayTableHead = `
    <tr><th>Date</th></tr>
    <tr><th>Hours Slept</th></tr>
    <tr><th>Sleep Quality</th></tr>
  `;
  displayFriendsResultsHead.insertAdjacentHTML('afterbegin', displayTableHead);
  allStats.forEach(stat => {
    let displayTableBody = `
      <tr>
        <td>${stat.date}</td>
        <td>${stat.hoursSlept} Hours Slept</td>
        <td>${stat.sleepQuality} Sleep Quality</td>
      </tr>`;
    displayFriendsResultsBody.insertAdjacentHTML('beforeend', displayTableBody);
  });
}

const displayHydrationGraph = (hydrationStats) => {
  let weeklyDates = hydrationStats.map(cell => cell.date);
  let weeklyNumOunces = hydrationStats.map(cell => {
    return cell.numOunces;
  });
  var myChart = new Chart(hydrationGraph, {
    type: 'bar',
    data: {
      labels: weeklyDates,
      datasets: [{
        label: 'Weekly Hydration Data',
        data: weeklyNumOunces,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  return myChart;
}

window.onload = () => {
  getCurrentUser(userData);
  document.querySelector('.user-name').innerText = `Welcome back ${currentUser.getUserName()}`
  // populateUserData(currentUser);
  // getUserStepGoal(currentUser);
  // getAllUsersStepGoal();
  // getUserWaterDrankToday();
  // getUserWaterDrankForTheWeek();
  // getUserDailySleepData();
  // getUserWeeklyHoursSlept();
  // getUserWeeklySleepQuality();
  // getUserAllTimeSleepData();
  // getDailyActivityData()
  // addDailyStepleaderBoard()
  // addDailyminutesActiveBoard()
  // addDailyStairClimbedBoard()
  // getWeeklyOverview()
  // createFriendsSection()
  // displayHydrationGraph();
  getUserWaterDrankForTheWeek();
  getUserWeeklySleepQuality();
};