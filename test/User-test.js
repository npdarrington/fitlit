const User = require('../src/User');
const userData = require('./userTestData');
const { expect } = require('chai');

describe('User', () => {
  let userId;
  let user1 = new User();
  beforeEach(() => {
    userId = userData.find(user => user.id === 1);
    user1 = new User(userId);
  });

  it('should be an instance of User', () => {
    user1 = new User(userData.id === 1);
    expect(user1).to.be.an.instanceof(User);
  });
});