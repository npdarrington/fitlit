class UserRepo {
  constructor(userData) {
    this.userData = userData;
  }

  returnUserData(number) {
    return this.userData.find(user => user.id === number);
  }

  returnAverageStepGoalAllUsers() {
    const stepCountGoalTotal = this.userData.reduce((startingValue, user) => {
      return startingValue + user.dailyStepGoal;
    }, 0);
    return stepCountGoalTotal / this.userData.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepo;
}