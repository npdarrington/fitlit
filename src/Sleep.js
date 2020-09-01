class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getCurrentUser(userId) {
    return this.sleepData.filter(user => user.userID === userId);
  }

  getUserAverageSleptHoursPerDay(userId) {
    const singleUserData = this.getCurrentUser(userId);
    if(singleUserData.length === 0){
      return undefined
    }
    const userSleepPerDayAverage = singleUserData.reduce((total, user) => {
      return total += user.hoursSlept;
    }, 0);
    const calculateHours = Math.floor(Math.abs(userSleepPerDayAverage / singleUserData.length));
    const calculateMins = Math.floor(Math.abs((userSleepPerDayAverage / singleUserData.length) * 60) % 60);
    return +(`${calculateHours}.${calculateMins}`);
  }

  getUserAverageSleepQualityAllTime(userId) {
    const singleUserData = this.getCurrentUser(userId);
    if(singleUserData.length === 0){
      return undefined
    }
    const userSleepQualityAverage =  singleUserData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0);
    return userSleepQualityAverage / singleUserData.length;
  }

  getUserDailySleepStats(userId, date, prop) {
    const singleUserData = this.getCurrentUser(userId);
    if (singleUserData.length === 0 || singleUserData[0][prop] === undefined) {
      return undefined
    }
    return singleUserData.find(user => user.date === date)[prop];
  }

  getUserWeeklySleepStats(userId, startDate, prop) {
    const singleUserData = this.getCurrentUser(userId);
    if (singleUserData.length === 0) {
      return undefined
    }
    const startDateObject = singleUserData.find(user => user.date === startDate);
    const indexOfStartDateObject = singleUserData.indexOf(startDateObject);
    const getUserSevenDaySleepData = singleUserData.map(user => {
      return { date: user.date, [prop]: user[prop] }
    });
    return getUserSevenDaySleepData.splice(indexOfStartDateObject, 7).reverse();
  }

  getAllUsersAverageSleepQuality() {
    const totalSleepQualityOfUsers = this.sleepData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0);
    return Math.round((totalSleepQualityOfUsers / this.sleepData.length) * 10) / 10;
  }

  getAllUsersSleepQualityAboveThreeForAWeek(startDate, endDate) {
    const filteredUsers = this.sleepData.filter(users => {
      return users.date >= startDate && users.date <= endDate;
    });
    const getSleepQualityByUserID = this.combineAllSleepQualityByUserID(filteredUsers);
    const averageEachUserSleepQuality = this.averageSleepQualityByUserID(getSleepQualityByUserID);
    return averageEachUserSleepQuality.filter(user => user.sleepQuality >= 3.0);
  }

  combineAllSleepQualityByUserID(userData) {
    return userData.reduce((object, user) => {
      if (!object[user.userID]) {
        object[user.userID] = [];
      }
      object[user.userID].push(user.sleepQuality);
      return object;
    }, {});
  }

  averageSleepQualityByUserID(userData) {
    return Object.keys(userData).map(userID => {
      let allSleepTotals = userData[userID].reduce((total, num) => {
        return total += num;
      }, 0);
      return { 
        userID, 
        sleepQuality: Math.round((allSleepTotals / userData[userID].length) * 10) / 10
      }
    });
  }

  getAllUsersWhoSleptTheMostByDate(date) {
    const getUsersByDate = this.sleepData.filter(users => {
      return users.date === date;
    });
    const getHighestUserSleptHours = getUsersByDate.sort((user1, user2) => {
      return user2.hoursSlept - user1.hoursSlept;
    });
    return getHighestUserSleptHours.filter(users => {
      return getHighestUserSleptHours[0].hoursSlept === users.hoursSlept;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}