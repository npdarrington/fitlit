const chai = require('chai');
const expect = chai.expect;
const sleepData = require('./sleepTestData');
const Sleep = require('../src/Sleep');

describe('Sleep', () => {
  let sleep;
  beforeEach(() => {
    sleep = new Sleep(sleepData);
  });

  it('Should get a user\'s verage number of hours slept per day', () => {
    expect(sleep.getUserAverageSleptHoursPerDay(1)).to.equal(7.34)
  });
});