const User = require('../src/User');
const userData = require('./userTestData');
const { expect } = require('chai');

describe('User', () => {
  let userId;
  let user = new User();
  beforeEach(() => {
    userId = userData.find(user => user.id === 1);
    user = new User(userId);
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should hold a single user property from data file', () => {
    expect(user.userData).to.deep.equal(user);
  });
});