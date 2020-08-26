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
    expect(sleep.getUserAverageSleptHoursPerDay(1)).to.equal(7.34);
  });

  it('Should should show a user their average sleep quality per day over all time', () => {
    expect(sleep.getUserAverageSleepQualityAllTime(1)).to.equal(2.7);
  });

  it('Should show a user how many hours they slept for a specific date', () => {
    expect(sleep.getSleepHoursForSpecificDay(1, '2019/06/29')).to.equal(5.3);
  });

  it('Should show a user their sleep quality for a specific date', () => {
    expect(sleep.getSleepQualityForSpecificDay(1, '2019/06/29')).to.equal(1.2);
  });

  it('Should show a user their sleep hours each day over 7 days', () => {
    expect(sleep.getHoursSleptPerDayForWeek(1, '2019/06/23')).to.deep.equal(
      [
        { date: '2019/06/29', hoursSlept: 5.3 },
        { date: '2019/06/28', hoursSlept: 7.6 },
        { date: '2019/06/27', hoursSlept: 9.4 },
        { date: '2019/06/26', hoursSlept: 7.7 },
        { date: '2019/06/25', hoursSlept: 5.1 },
        { date: '2019/06/24', hoursSlept: 8 },
        { date: '2019/06/23', hoursSlept: 7.8 }
      ]
    );
  });

  it('Should show a user their sleep quality each day over 7 days', () => {
    expect(sleep.getUserSleepQualityPerDayForWeek(1, '2019/06/23')).to.deep.equal(
      [
        { date: '2019/06/29', sleepQuality: 1.2 },
        { date: '2019/06/28', sleepQuality: 4.7 },
        { date: '2019/06/27', sleepQuality: 4.6 },
        { date: '2019/06/26', sleepQuality: 2.4 },
        { date: '2019/06/25', sleepQuality: 3.7 },
        { date: '2019/06/24', sleepQuality: 1.3 },
        { date: '2019/06/23', sleepQuality: 1.5 }
      ]
    );
  });

  it('Should get all users average sleep quality', () => {
    expect(sleep.getAllUsersAverageSleepQuality()).to.equal(3);
  });
});