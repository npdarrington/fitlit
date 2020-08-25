const expect = require('chai').expect;
const UserRepo = require('../src/UserRepo');
const User = require('../src/User');
const userData = require('./userTestData');

describe('User', () => {
  let allUsers;
  let user;
  beforeEach(() => {
    allUsers = new UserRepo(userData);
    user = new User(allUsers.returnUserData(1));
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should hold a single user property from data file', () => {
    expect(user.userData).to.deep.equal(
      {
        id: 1,
        name: 'Luisa Hane',
        address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
        email: 'Diana.Hayes1@hotmail.com',
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [ 16, 4, 8 ]
      }
    );
  });

  it('should return a user\'s first name only', () => {
    expect(user.getUserName()).to.equal('Luisa');
  });
});