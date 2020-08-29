class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getCurrentUser(userId) {
    return this.sleepData.filter(user => user.userID === userId);
  }

  getUserAverageSleptHoursPerDay(userId) {
    const singleUserData = this.getCurrentUser(userId);
    const userSleepPerDayAverage = singleUserData.reduce((total, user) => {
      return total += user.hoursSlept;
    }, 0);
    const averageUserSleepHours = userSleepPerDayAverage / singleUserData.length;
    const getDecimalNumber = averageUserSleepHours.toString().split('.');
    const turnDecimalIntoMinutes = Math.round(`.${getDecimalNumber[1]}` * 60);
    return +(`${getDecimalNumber[0]}.${turnDecimalIntoMinutes}`);
  }

  getUserAverageSleepQualityAllTime(userId) {
    let singleUserData = this.getCurrentUser(userId);
    let userSleepQualityAverage =  singleUserData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0);
    return userSleepQualityAverage / singleUserData.length;
  }

  getSleepHoursForSpecificDay(userId, date) {
    let singleUserData = this.getCurrentUser(userId);
    let getDataForSpecificDate = singleUserData.find(user => {
      return user.date === date;
    });
    return getDataForSpecificDate.hoursSlept;
  }

  getSleepQualityForSpecificDay(userId, date) {
    let singleUserData = this.getCurrentUser(userId);
    let getDataForSpecificDate = singleUserData.find(user => {
      return user.date === date;
    });
    return getDataForSpecificDate.sleepQuality;
  }

  getHoursSleptPerDayForWeek(userId, startDate) {
    let singleUserData = this.getCurrentUser(userId);
    let startDateObject = singleUserData.find(user => user.date === startDate);
    let indexOfStartDateObject = singleUserData.indexOf(startDateObject);
    let getUserSevenDaySleepData = singleUserData.map(user => {
      return { date: user.date, hoursSlept: user.hoursSlept }
    });
    return getUserSevenDaySleepData.splice(indexOfStartDateObject, 7).reverse();
  }

  getUserSleepQualityPerDayForWeek(userId, startDate) {
    let singleUserData = this.getCurrentUser(userId);
    let startDateObject = singleUserData.find(user => user.date === startDate);
    let indexOfStartDateObject = singleUserData.indexOf(startDateObject);
    let getUserSevenDaySleepQuality = singleUserData.map(user => {
      return { date: user.date, sleepQuality: user.sleepQuality }
    });
    return getUserSevenDaySleepQuality.splice(indexOfStartDateObject, 7).reverse();
  }

  getAllUsersAverageSleepQuality() {
    let totalSleepQualityOfUsers = this.sleepData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0);
    return Math.round((totalSleepQualityOfUsers / this.sleepData.length) * 10) / 10;
  }

  getAllUsersSleepQualityAboveThreeForAWeek(startDate, endDate) {
    let filteredUsers = this.sleepData.filter(users => {
      return users.date >= startDate && users.date <= endDate;
    });
    let getSleepQualityByUser = filteredUsers.reduce((object, user) => {
      if (!object[user.userID]) {
        object[user.userID] = [user.sleepQuality];
      } else {
        object[user.userID].push(user.sleepQuality);
      }
      return object;
    }, {});
    var result = Object.keys(getSleepQualityByUser).map(key => {
      return { userID: key, sleepQuality: getSleepQualityByUser[key] }
    });
    let getAllUsersAverageSleepQuality = result.map(user => {
      let total = 0;
      user.sleepQuality.forEach(quality => {
        total += quality;
      });
      return { userID: user.userID, sleepQuality: Math.round((total / user.sleepQuality.length) * 10) / 10 };
    });
    let getAllUsersSleepQualityAboveThreeForAWeek = getAllUsersAverageSleepQuality.filter(user => user.sleepQuality >= 3.0);
    return getAllUsersSleepQualityAboveThreeForAWeek;
  }

  getAllUsersWhoSleptTheMostByDate(date) {
    let getUsersByDate = this.sleepData.filter(users => {
      return users.date === date;
    });
    let getHighestUserSleptHours = getUsersByDate.sort((user1, user2) => {
      return user2.hoursSlept - user1.hoursSlept;
    });
    let getAllUsers = [];
    getHighestUserSleptHours.filter(users => {
      if (getHighestUserSleptHours[0].hoursSlept === users.hoursSlept) {
        getAllUsers.push(users);
      }
    });
    return getAllUsers;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}