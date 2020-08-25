const expect = require('chai').expect;
const User = require('../src/User');
const userData = require('./userTestData');

describe('User', () => {
  let user = new User();
  beforeEach(() => {
    user = new User(1);
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should hold a single user property from data file', () => {
    expect(user.userData).to.deep.equal(user);
  });

  it('should return a user\'s first name only', () => {
    expect(user.getUserName()).to.equal('Luisa Hane');
  });
});