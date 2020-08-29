class Hydration {
  constructor(HydrationData) {
    this.HydrationData = HydrationData;
  }
	
  returnAverergeUserFluidOuncesConsumedAllTime(UserId) {
    const singleUserData = this.HydrationData.filter(user => { 
      return user.userID === UserId;
    });
    const totalOuncesDrank = singleUserData.reduce((startingValue, user)=> {
      return startingValue += user.numOunces;
    }, 0);
    return totalOuncesDrank / singleUserData.length;
  }

  returnFluidOuncesForSpecificDay(userId, date) {
    const singleUserData = this.HydrationData.filter(user => { 
      return user.userID === userId;
    });
    return singleUserData.find(user => user.date === date).numOunces;
  }

  returnUserWeeklyFluidConsumption(UserId, startDate) {
    const singleUserData = this.HydrationData.filter(user => { 
      return user.userID === UserId;
    });
    const startDateObject = singleUserData.find(user => user.date === startDate);
    const indexOfstartDateObject = singleUserData.indexOf(startDateObject);
    const UsernumOunces = singleUserData.map(user => {
      return { date: user.date, numOunces: user.numOunces };
    });
    return UsernumOunces.splice(indexOfstartDateObject, 7).reverse();
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}