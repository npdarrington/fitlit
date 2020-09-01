let challengeBoardTitle = document.querySelector('.challenge-board-title');
let displayFriendsResultsHead = document.querySelector('.display-friends-results > thead');
let displayFriendsResultsBody = document.querySelector('.display-friends-results > tbody');
let userProfileSection = document.querySelector('.user-profile');
let hydrationGraph = document.querySelector('#hydration-stats');
let userHotLinks = document.querySelector('.user-hotlinks');
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

function changeUserDataDisplayHandler(event) {
  if (event.target.closest('.profile')) displayUserProfile(currentUser);
  if (event.target.closest('.hydration')) displayUserDailyHydration();
  if (event.target.closest('.sleep')) displayUserDailySleep();
}

const displayUserProfile = currentUser => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Profile</h3>
    <h5>Name: ${currentUser.userData.name}</h5>
    <h5>Address: ${currentUser.userData.address}</h5>
    <h5>Email: ${currentUser.userData.email}</h5>
    <h5>Friends: ${currentUser.userData.friends}</h5>
    <h5>Stride Length: ${currentUser.userData.strideLength}</h5>
    <h5>Your Daily Step Goal: ${currentUser.userData.dailyStepGoal}</h5>
    <h5>All Users Daily Step Goal: ${allUsers.returnAverageStepGoalAllUsers()}</h5>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
}

const displayUserDailyHydration = () => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Daily Hydration</h3>
    <h3>Today's Hydration: ${hydration.returnFluidOuncesForSpecificDay(currentUser.userData.id, '2019/09/22')}</h3>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
  getUserWaterDrankForTheWeek();
}

const getUserWaterDrankForTheWeek = () => {
  var UserHydration =  hydration.returnUserWeeklyFluidConsumption(currentUser.userData.id, '2019/09/22');
  displayHydrationGraph(UserHydration);
}

const displayUserDailySleep = () => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Daily Sleep Stats</h3>
    <h5>Today's Hours Slept: ${sleep.getUserDailySleepStats(currentUser.userData.id, '2019/09/22', 'hoursSlept')}</h5>
    <h5>Today's Sleep Quality: ${sleep.getUserDailySleepStats(currentUser.userData.id, '2019/09/22', 'sleepQuality')}</h5>
    <br><br>
    <h3>${currentUser.getUserName()}'s All-Time Sleep Stats</h3>
    <h5>All Time Avg Hours Slept: ${sleep.getUserAverageSleptHoursPerDay(currentUser.userData.id)}</h5>
    <h5>All Time Avg Sleep Quality: ${sleep.getUserAverageSleepQualityAllTime(currentUser.userData.id)}</h5>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
}

const getUserWeeklySleepQuality = () => {
  let sleepQualityData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23', 'sleepQuality');
  const sleepHoursSleptData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/06/23', 'hoursSlept');
  sleepQualityData.forEach((user, index) => {
    user.hoursSlept = sleepHoursSleptData[index].hoursSlept;
  });
  challengeBoardTitle.innerText = 'Weekly Sleep Stats';
  playWithTheTable(sleepQualityData);
}

// const getUserStepGoal = currentUser => {
//   userStepGoal.innerText = currentUser.userData.dailyStepGoal;
// }

// const getAllUsersStepGoal = () => {
//   allUsersStepGoal.innerText = allUsers.returnAverageStepGoalAllUsers();
// }

// const getUserWaterDrankToday = () => {
//   waterDrankToday.innerText = hydration.returnFluidOuncesForSpecificDay(currentUser.userData.id,'2019/06/15');
// }

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

userHotLinks.addEventListener('click', changeUserDataDisplayHandler);

window.onload = () => {
  getCurrentUser(userData);
  document.querySelector('.user-name').innerHTML = `<span class="user-name-large">Welcome back ${currentUser.getUserName()}</span>`
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
  getUserWeeklySleepQuality();
};