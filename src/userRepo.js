class UserRepo {
  constructor(userData) {
    this.userData = userData;
  }

  returnUserData(number) {
    return this.userData.filter(user => user.id === number)[0]
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