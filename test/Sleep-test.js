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

  it('Should should show a user their average sleep quality per day over all time', () => {
    expect(sleep.getUserAverageSleepQualityAllTime(1)).to.equal(2.7)
  });

  it('Should show a user how many hours they slept for a specific date', () => {
    expect(sleep.getSleepHoursForSpecificDay(1, "2019/06/29")).to.equal(5.3)
  })
});