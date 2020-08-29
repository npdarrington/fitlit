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
    const singleUserData = this.getCurrentUser(userId);
    const userSleepQualityAverage =  singleUserData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0);
    return userSleepQualityAverage / singleUserData.length;
  }

  getUserDailySleepStats(userId, date, prop) {
    const singleUserData = this.getCurrentUser(userId);
    return singleUserData.find(user => user.date === date)[prop];
  }

  getUserWeeklySleepStats(userId, startDate, prop) {
    const singleUserData = this.getCurrentUser(userId);
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
    const getSleepQualityByUser = filteredUsers.reduce((object, user) => {
      if (!object[user.userID]) {
        object[user.userID] = [user.sleepQuality];
      } else {
        object[user.userID].push(user.sleepQuality);
      }
      return object;
    }, {});
    const result = Object.keys(getSleepQualityByUser).map(key => {
      return { userID: key, sleepQuality: getSleepQualityByUser[key] }
    });
    const getAllUsersAverageSleepQuality = result.map(user => {
      let total = 0;
      user.sleepQuality.forEach(quality => {
        total += quality;
      });
      return { userID: user.userID, sleepQuality: Math.round((total / user.sleepQuality.length) * 10) / 10 };
    });
    const getAllUsersSleepQualityAboveThreeForAWeek = getAllUsersAverageSleepQuality.filter(user => user.sleepQuality >= 3.0);
    return getAllUsersSleepQualityAboveThreeForAWeek;
  }

  getAllUsersWhoSleptTheMostByDate(date) {
    const getUsersByDate = this.sleepData.filter(users => {
      return users.date === date;
    });
    const getHighestUserSleptHours = getUsersByDate.sort((user1, user2) => {
      return user2.hoursSlept - user1.hoursSlept;
    });
    const getAllUsers = [];
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