const chai = require('chai')
const expect = chai.expect
const Activity = require('../src/Activity.js')
const User = require ('../src/User');
let activity;
let user;

beforeEach(function(){
    activity = new Hydration(activityTestData)
    user = new User(userTestData)
})
describe('Activity',()=>{
    it('Should, given a specific day return the miles a user has walked based on their number of steps', () => {
        expect().to.equal
    })
    
})