const chai = require('chai')
const expect = chai.expect
const Activity = require('../src/Activity.js')
const User = require ('../src/User.js');
const UserRepo = require ('../src/userRepo.js');
const activityTestData = require('./activity-test-data.js')
const userTestData = require('./userTestData.js');
const activityData = require('./activity-test-data.js');
let activity;
let user;

beforeEach(function() {
  userRepo = new UserRepo(userTestData)
  activity = new Activity(activityTestData, userRepo.returnUserData(1))
})
describe('Activity', ()=>{
  it('Should, given a specific day return the miles a user has walked based on their number of steps', () => {
    console.log('user',activity.user)
    expect(activity.returnMilesWalkedForGivenDay("2019/06/28")).to.equal(8.56)
  })
  it('Should return how many minutes were they active for a given day ',()=>{
    expect(activity.returnMinutesActiveForGivenDay(1,"2019/06/28")).to.equal(169)
  })
  it('Should return how many minutes active did they average for a given week', ()=>{
    expect(activity.returnAverageActiveMinutesForWeek(1,"2019/06/21")).to.equal(140)
  })
  it('Should Not return how many minutes active did they average for a given week given an invalid user', ()=>{
    expect(activity.returnAverageActiveMinutesForWeek(99,"2019/06/21")).to.equal(0)
  })
  it('Should return if a user reached their step goal for a given day ',()=> {
    expect(activity.returnIfUserReachedStepGoalForDay(1,"2019/06/28")).to.equal(true)
  })
 
  it('Should return all days a user reached their step goal', ()=>{
    expect(activity.returnAllDaysAUserReachedTheirStepGoal(1)).to.deep.equal([
      { date: '2019/06/17', numSteps: 14329 },
      { date: '2019/06/20', numSteps: 14478 },
      { date: '2019/06/22', numSteps: 10289 },
      { date: '2019/06/23', numSteps: 13928 },
      { date: '2019/06/28', numSteps: 10517 }
    ])
  })
  it('Should Not return all days a user reached their step goal given a invalid user', ()=>{
    expect(activity.returnAllDaysAUserReachedTheirStepGoal(98)).to.deep.equal([])
  })
  it('Should return their all-time stair climbing record', ()=>{
    expect(activity.returnAlltimeStairClimbingRecord(1)).to.equal(39)
  })
  it('Should NOT return all all-time stair climbing record when given invalid user Id', ()=>{
    expect(activity.returnAlltimeStairClimbingRecord(51)).to.equal(undefined)
  })
  it('Should return average number of stairs climbed for a specified date for all user',()=>{
    expect(activity.returnAverageNumberofActivityForDay("2019/06/21", 'flightsOfStairs')).to.equal(20)
  })
  it('Should Not return average number of stairs climbed for a specified date for all users for a invalid date',()=>{
    expect(activity.returnAverageNumberofActivityForDay("2020/09/21", 'flightsOfStairs')).to.equal(0)
  })
  it('Should return average number of steps taken for a specified date for all user',()=>{
    expect(activity.returnAverageNumberofActivityForDay("2019/06/21", 'numSteps')).to.equal(9164)
  })
  it('Should return average number of minutes active for a specified date for all user',()=>{
    expect(activity.returnAverageNumberofActivityForDay("2019/06/21", 'minutesActive')).to.equal(157)
  })
})