class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getUserAverageSleptHoursPerDay(userId) {
    let singleUserData = this.sleepData.filter(user => {
      return user.userID === userId;
    });
    let userSleepPerDayAverage = singleUserData.reduce((total, user) => {
      return total += user.hoursSlept;
    }, 0);
    let averageUserSleepHours = userSleepPerDayAverage / singleUserData.length;
    let getDecimalNumber = averageUserSleepHours.toString().split('.');
    let turnDecimalIntoMinutes = Math.round(`.${getDecimalNumber[1]}` * 60);
    let finalNumber = +(`${getDecimalNumber[0]}.${turnDecimalIntoMinutes}`);
    return finalNumber;
  }

  getUserAverageSleepQualityAllTime(userId) {
    let singleUserData = this.sleepData.filter(user => {
      return user.userID === userId;
    });
    let userSleepQualityAverage =  singleUserData.reduce((total, user) => {
      return total += user.sleepQuality;
    }, 0);
    return userSleepQualityAverage / singleUserData.length;
  }

  getSleepHoursForSpecificDay(userId, date) {
    let singleUserData = this.sleepData.filter(user => {
      return user.userID === userId;
    });
    let getDataForSpecificDate = singleUserData.find(user => {
      return user.date === date;
    });
    return getDataForSpecificDate.hoursSlept;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}