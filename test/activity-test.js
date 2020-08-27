const chai = require('chai')
const expect = chai.expect
const Activity = require('../src/Activity.js')
const User = require ('../src/User.js');
const activityTestData = require('./activity-test-data.js')
const userTestData = require('./userTestData.js')
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
    
})