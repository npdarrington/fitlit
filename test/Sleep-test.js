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
  it('Should Not get a user\'s verage number of hours slept per day given an invalid user', () => {
    expect(sleep.getUserAverageSleptHoursPerDay(98)).to.equal(undefined);
  });


  it('Should should show a user their average sleep quality per day over all time', () => {
    expect(sleep.getUserAverageSleepQualityAllTime(1)).to.equal(2.7);
  });

  it('Should show a user how many hours they slept for a specific date', () => {
    expect(sleep.getUserDailySleepStats(1, '2019/06/29', 'hoursSlept')).to.equal(5.3);
  });
  it('Should Not show daily sleep stats given an invalid property', () => {
    expect(sleep.getUserDailySleepStats(1, '2019/06/29', 'hours')).to.equal(undefined);
  });

  it('Should show a user their sleep quality for a specific date', () => {
    expect(sleep.getUserDailySleepStats(1, '2019/06/29', 'sleepQuality')).to.equal(1.2);
  });

  it('Should show a user their sleep hours each day over 7 days', () => {
    expect(sleep.getUserWeeklySleepStats(1, '2019/06/23', 'hoursSlept')).to.deep.equal(
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
  it('Should Not show a user their sleep hours each day over 7 days given an invalid user', () => {
    expect(sleep.getUserWeeklySleepStats(98, '2019/06/23', 'hoursSlept')).to.deep.equal(undefined);
  });

  it('Should show a user their sleep quality each day over 7 days', () => {
    expect(sleep.getUserWeeklySleepStats(1, '2019/06/23', 'sleepQuality')).to.deep.equal(
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

  it('Should get all users sleep quality greater than 3 for a given week', () => {
    expect(sleep.getAllUsersSleepQualityAboveThreeForAWeek('2019/06/23', '2019/06/29')).to.deep.equal(
      [
        { userID: '3', sleepQuality: 3.4 },
        { userID: '4', sleepQuality: 3.6 },
        { userID: '8', sleepQuality: 3 },
        { userID: '10', sleepQuality: 3.8 },
        { userID: '11', sleepQuality: 3 },
        { userID: '12', sleepQuality: 3.1 },
        { userID: '13', sleepQuality: 3.3 },
        { userID: '15', sleepQuality: 3.1 },
        { userID: '16', sleepQuality: 3.1 },
        { userID: '17', sleepQuality: 3.3 },
        { userID: '18', sleepQuality: 3.1 },
        { userID: '19', sleepQuality: 3.5 },
        { userID: '20', sleepQuality: 3.3 },
        { userID: '21', sleepQuality: 3.4 },
        { userID: '22', sleepQuality: 3 },
        { userID: '25', sleepQuality: 3.1 },
        { userID: '26', sleepQuality: 3.1 },
        { userID: '27', sleepQuality: 3.1 },
        { userID: '28', sleepQuality: 3.1 },
        { userID: '32', sleepQuality: 3.8 },
        { userID: '36', sleepQuality: 3.1 },
        { userID: '37', sleepQuality: 4.3 },
        { userID: '43', sleepQuality: 3.7 },
        { userID: '44', sleepQuality: 3.2 },
        { userID: '46', sleepQuality: 3.3 },
        { userID: '48', sleepQuality: 3.1 },
        { userID: '49', sleepQuality: 3.5 }
      ]);
  });

  it('Should find the users who slept the most number of hours', () => {
    expect(sleep.getAllUsersWhoSleptTheMostByDate('2019/06/23')).to.deep.equal(
      [
        { userID: 49, date: '2019/06/23', hoursSlept: 11, sleepQuality: 4.3 }
      ]
    );
  });
});