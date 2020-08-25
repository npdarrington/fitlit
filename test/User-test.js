const expect = require('chai').expect;
const User = require('../src/User');
const userData = require('./userTestData');

describe('User', () => {
  let selectedUser;
  let user;
  beforeEach(() => {
    selectedUser = userData.find(user => user.id === 1);
    user = new User(selectedUser);
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should hold a single user property from data file', () => {
    expect(user.userData).to.equal(selectedUser);
  });

  it('should return a user\'s first name only', () => {
    expect(user.getUserName()).to.equal('Luisa');
  });
});