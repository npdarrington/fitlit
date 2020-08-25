class User {
  constructor(userData) {
    this.userData = userData;
  }

  getUserName() {
    return this.userData.name.substr(0, this.userData.name.indexOf(' '));
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}