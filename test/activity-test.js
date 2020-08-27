const chai = require('chai')
const expect = chai.expect
const Activity = require('../src/Activity.js')
const User = require ('../src/User.js');
const activityTestData = require('./activity-test-data.js')
const userTestData = require('./userTestData.js');
const activityData = require('./activity-test-data.js');
let activity;
let user;

beforeEach(function(){
    activity = new Activity(activityTestData)
    user = new User(userTestData)
})
describe('Activity',()=>{
    it('Should, given a specific day return the miles a user has walked based on their number of steps', () => {
        expect(activity.returnMilesWalkedForGivenDay(1,"2019/06/28")).to.equal(8.56)
    })
    it('Should return how many minutes were they active for a given day ',()=>{
        expect(activity.returnMinutesWalkedForGivenDay(1,"2019/06/28")).to.equal(169)

    })
    it('Should return how many minutes active did they average for a given week', ()=>{
        expect(activity.returnAverageActiveMinutesForWeek(1,"2019/06/21"))
    })
    it('Should return if a user reached their step goal for a given day ',()=> {
        expect(activity.returnIfUserReachedStepGoalForDay(1,"2019/06/28")).to.equal(true)
    })
    it('Should return all days a user reached their step goal', ()=>{
        expect(activity.returnAllDaysAUserReachedTheirStepGoal(1)).to.deep.equal()
    })
    it('Should return their all-time stair climbing record', ()=>{
        expect(activity.returnAlltimeStairClimbingRecord()).to.equal(39)
    })
    it('Should return average number of stairs climbed for a specified date for all user',()=>{
        expect(activity.returnAverageNumberOfStairsClimbedForDay("2019/06/21")).to.equal()
    })
    it('Should return average number of steps taken for a specified date for all user',()=>{
        expect(activity.returnAverageNumberOfStepsTakenForDay("2019/06/21")).to.equal()
    })
    it('Should return average number of minutes active for a specified date for all user',()=>{
        expect(activity.returnAverageNumberOfMinutesActiveForDay("2019/06/21")).to.equal()
    })
    
})