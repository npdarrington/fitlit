class Hydration {
  constructor(HydrationData) {
    this.HydrationData = HydrationData;
  }

  getCurrentUser(userId) {
    return this.HydrationData.filter(user => user.userID === userId);
  }
	
  returnAverergeUserFluidOuncesConsumedAllTime(userId) {
    if (this.getCurrentUser(userId).length === 0 ) {
      return undefined
    }
    const singleUserData = this.getCurrentUser(userId);
    const totalOuncesDrank = singleUserData.reduce((startingValue, user)=> {
      return startingValue += user.numOunces;
    }, 0);
    return totalOuncesDrank / singleUserData.length;
  }

  returnFluidOuncesForSpecificDay(userId, date) {
    const singleUserData = this.getCurrentUser(userId);
    if(singleUserData.length === 0){
      return undefined
    }
    return singleUserData.find(user => user.date === date).numOunces;
  }

  returnUserWeeklyFluidConsumption(userId, startDate) {
    const singleUserData = this.getCurrentUser(userId);
    const startDateObject = singleUserData.find(user => user.date === startDate);
    const indexOfstartDateObject = singleUserData.indexOf(startDateObject);
    const UsernumOunces = singleUserData.map(user => {
      return { date: user.date, numOunces: user.numOunces };
    });
    return UsernumOunces.splice(indexOfstartDateObject - 6, 7).reverse();
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}