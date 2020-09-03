let displayFriendsResultsHead = document.querySelector('.display-friends-results > thead');
let displayFriendsResultsBody = document.querySelector('.display-friends-results > tbody');
let userProfileSection = document.querySelector('.user-profile');
let hydrationGraph = document.querySelector('#hydration-stats');
let userHotLinks = document.querySelector('.user-hotlinks');
let bottomOfPage = document.querySelector('#user-bottom')
let currentUser;
let indexOfUser  = Math.floor(Math.random() * 50) + 1;

const allUsers = new UserRepo(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const activity = new Activity(activityData, allUsers.returnUserData(indexOfUser));

const getCurrentUser = () => {
  currentUser = new User(allUsers.returnUserData(indexOfUser));
  return currentUser;
}

function changeUserDataDisplayHandler(event) {
  if (event.target.closest('.profile')) {
    displayUserProfile(currentUser);
  }
  if (event.target.closest('.hydration')) {
    displayUserDailyHydration();
  } 
  if (event.target.closest('.sleep')) {
    displayAllUserSleepData();
  } 
  if (event.target.closest('.activity')) {
    getUserWeeklyActivity();
  }
}

const displayUserProfile = currentUser => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Profile</h3>
    <p>Name: ${currentUser.userData.name}</p>
    <p>Address: ${currentUser.userData.address.split(',')[0]}</p>
    <p>Email: ${currentUser.userData.email}</p>    
    <p>Your Daily Step Goal: ${currentUser.userData.dailyStepGoal}</p>
    <p>All Users Daily Step Goal: ${allUsers.returnAverageStepGoalAllUsers()}</p>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
}

const displayUserDailyHydration = () => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Daily Hydration</h3>
    <h4>Today's Hydration: ${hydration.returnFluidOuncesForSpecificDay(currentUser.userData.id, '2019/09/22')} ounces</h4>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
  getUserWaterDrankForTheWeek();
}

const getUserWaterDrankForTheWeek = () => {
  let UserHydration =  hydration.returnUserWeeklyFluidConsumption(currentUser.userData.id, '2019/09/22');
  displayHydrationGraph(UserHydration);
}

const displayAllUserSleepData = () => {
  getUserWeeklySleepQuality();
  displayUserDailySleep();
}

const displayUserDailySleep = () => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Daily Sleep Stats</h3>
    <p>Today's Hours Slept: ${sleep.getUserDailySleepStats(currentUser.userData.id, '2019/09/22', 'hoursSlept')}</p>
    <p>Today's Sleep Quality: ${sleep.getUserDailySleepStats(currentUser.userData.id, '2019/09/22', 'sleepQuality')}</p>
    <br>
    <h3>${currentUser.getUserName()}'s All-Time Sleep Stats</h3>
    <p>All Time Avg Hours Slept: ${sleep.getUserAverageSleptHoursPerDay(currentUser.userData.id)}</p>
    <p>All Time Avg Sleep Quality: ${sleep.getUserAverageSleepQualityAllTime(currentUser.userData.id)}</p>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
}

const getUserWeeklySleepQuality = () => {
  let sleepQualityData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/09/22', 'sleepQuality');
  const sleepHoursSleptData = sleep.getUserWeeklySleepStats(currentUser.userData.id, '2019/09/22', 'hoursSlept');
  sleepQualityData.forEach((user, index) => {
    user.hoursSlept = sleepHoursSleptData[index].hoursSlept;
  });
  displaySleepToTable(sleepQualityData);
}

const displaySleepToTable = allStats => {
  clearTableData();
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

const getUserWeeklyActivity = () => {
  let numStepsWeekly = activity.returnActvityWeeklyOverview(indexOfUser, '2019/09/22', 'numSteps');
  let minutesActiveWeekly = activity.returnActvityWeeklyOverview(indexOfUser, '2019/09/22', 'minutesActive');
  let flightsOfStairsWeely = activity.returnActvityWeeklyOverview(indexOfUser, '2019/09/22', 'flightsOfStairs');
  numStepsWeekly.forEach((user, index) => {
    user.minutesActive = minutesActiveWeekly[index].minutesActive;
    user.flightsOfStairs = flightsOfStairsWeely[index].flightsOfStairs;
  });
  displayActivityToTable(numStepsWeekly);
  displayDailyUserActivity();
  createActivityLeaderBoards();
}

const displayActivityToTable = allStats => {
  clearTableData();
  let displayTableHead = `
    <tr><th>Date</th></tr>
    <tr><th>Number Of Steps</th></tr>
    <tr><th>Minutes Active</th></tr>
    <tr><th>Flights Of Stairs</th></tr>
  `;
  displayFriendsResultsHead.insertAdjacentHTML('afterbegin', displayTableHead);
  allStats.forEach(activity => {
    let displayTableBody = `
      <tr>
        <td>${activity.date}</td>
        <td>${activity.numSteps} Number of Steps</td>
        <td>${activity.minutesActive} Minutes Active</td>
        <td>${activity.flightsOfStairs} Flights of Stairs</td>
      </tr>`;
    displayFriendsResultsBody.insertAdjacentHTML('beforeend', displayTableBody);
  });
}

const displayDailyUserActivity = () => {
  userProfileSection.innerHTML = '';
  let buildUserData = `
    <h3>${currentUser.getUserName()}'s Daily Activity Stats</h3>
    <p>Today's Number Of Steps: ${activity.returnNumOfStepsForGivenDay(currentUser.userData.id, '2019/09/22')}</p>
    <p>Today's Minutes Active: ${activity.returnMinutesActiveForGivenDay(currentUser.userData.id, '2019/09/22')}</p>
    <p>Today's Distance Walked: ${activity.returnMilesWalkedForGivenDay('2019/09/22')}</p>
  `;
  userProfileSection.insertAdjacentHTML('afterbegin', buildUserData);
}

const clearTableData = () => {
  displayFriendsResultsBody.innerHTML = '';
  displayFriendsResultsHead.innerHTML = '';
}
const createActivityLeaderBoards = () =>{
  let title = document.querySelector('.leader-board-title');
  addDailyStepleaderBoard();
  addDailyminutesActiveBoard();
  addDailyStairClimbedBoard();
}
const generateLeaderboard = (activityForLeaderBoard, date) =>{
  let singleDay = activity.data.filter(user => {
    return user.date === date;
  });
  let sortedArray = singleDay.sort((user, nextUser)=>{
    return nextUser[activityForLeaderBoard] - user[activityForLeaderBoard];
  })
  return sortedArray;
}
    
const addDailyStepleaderBoard = () =>{
  let sortedArray = generateLeaderboard('numSteps', '2019/09/22');
  let numSteps = document.querySelector('.numSteps');
  numSteps.classList.remove('hidden');

  numSteps.innerHTML = '';
  sortedArray.forEach((user, i) =>{
    if (i < 5 ) {
      let userSection = document.createElement('section');
      userSection.innerText = `${i + 1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.numSteps} number of steps`;
      numSteps.appendChild(userSection);
    }
  })
  bottomOfPage.appendChild(numSteps);
}
const addDailyminutesActiveBoard = () =>{
  let sortedArray = generateLeaderboard('minutesActive', '2019/09/22');
  let dailyMinActive = document.querySelector('.minutesActive');
  dailyMinActive.innerHTML = '';
  dailyMinActive.classList.remove('hidden');
  sortedArray.forEach((user, i) => {
    if (i < 5) {
      let userSection = document.createElement('section');
      userSection.innerText = `${i + 1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.minutesActive} minutes active`;
      dailyMinActive.appendChild(userSection);
    }
  })
  bottomOfPage.appendChild(dailyMinActive);
}
const addDailyStairClimbedBoard = () =>{
  let sortedArray = generateLeaderboard('flightsOfStairs', '2019/09/22');
  let flightsOfStairs = document.querySelector('.flights-of-stairs');
  flightsOfStairs.classList.remove('hidden');
  flightsOfStairs.innerHTML = '';
  sortedArray.forEach((user, i) => {
    if (i < 5) {
      let userSection = document.createElement('section');
      userSection.innerText = `${i + 1} ${new User(allUsers.returnUserData(user.userID)).userData.name} : ${user.flightsOfStairs} flights of stairs`;
      flightsOfStairs.appendChild(userSection);
    }
  })
  bottomOfPage.appendChild(flightsOfStairs);
}

const createFriendsSection = () => {
  let friends = allUsers.userData.filter(user => {
    return currentUser.userData.friends.includes(user.id) || user.id === indexOfUser;
  });
  let friendsWeeklySteps = findFriendsWeeklySteps(friends);
  let stepCounts =  findUserStepCounts(friendsWeeklySteps);
  let sortedSteps = stepCounts.sort((firstValue, secondValue) => {
    return secondValue.steps - firstValue.steps;
  })
  addFriendsToHtml(sortedSteps);
}
const findFriendsWeeklySteps = (friends) =>{
  return friends.map(user => {
    return { 
      id: user.id,
      date: activity.returnActvityWeeklyOverview(user.id, '2019/09/22', 'numSteps')
    };
  });
}

const addFriendsToHtml = (sortedSteps) =>{
  let competion = document.querySelector('.friend-competition');
  sortedSteps.forEach((user, i) => {
    let friendSection = document.createElement('div');
    if (user.id === indexOfUser ) {
      friendSection.innerText = `${i + 1}. You : ${user.steps} steps`;
    } else {
      friendSection.innerText = `${i + 1}. ${allUsers.userData[user.id - 1].name}: ${user.steps} steps`;
    }
    competion.appendChild(friendSection);
  });
}

const findUserStepCounts = (friendsWeeklySteps) => {
  return friendsWeeklySteps.map(userSteps =>{
    let obj = {};
    obj.id = userSteps.id;
    obj.steps =  userSteps.date.reduce((startingValue, date) => {
      return startingValue += date.numSteps;
    }, 0);
    return obj;
  });
}

const displayHydrationGraph = (hydrationStats) => {
  let weeklyDates = hydrationStats.map(cell => cell.date);
  let weeklyNumOunces = hydrationStats.map(cell => {
    return cell.numOunces;
  });
  let myChart = new Chart(hydrationGraph, {
    type: 'bar',
    data: {
      labels: weeklyDates,
      datasets: [{
        label: 'Weekly Hydration Data (oz.)',
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
let addUserNametoDom = () => {
  document.querySelector('.user-name').innerHTML = `<span class="user-name-large">Welcome Back ${currentUser.getUserName()}</span>`;
}
userHotLinks.addEventListener('click', changeUserDataDisplayHandler);

window.onload = () => {
  getCurrentUser(userData);
  getUserWaterDrankForTheWeek()
  createFriendsSection()
  getUserWeeklyActivity()
  addUserNametoDom()
};