const chai = require('chai')
const expect = chai.expect
const UserRepo = require('../src/userRepo.js')
const testData = require('./userTestData.js')
let userRepo;
beforeEach(function(){
    userRepo = new UserRepo(testData)
})
describe('UserRepo',function(){
   
    it('Given a user’s ID, should return correct user data',function(){
       expect (userRepo.returnUserData(1)).to.deep.equal(
            {
                "id": 1,
                "name": "Luisa Hane",
                "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
                "email": "Diana.Hayes1@hotmail.com",
                "strideLength": 4.3,
                "dailyStepGoal": 10000,
                "friends": [
                  16,
                  4,
                  8
                ]
              },
        )

    })
    it('should be able to return the average step goal amongst all users',function(){
        expect(userRepo.returnAverageStepCount()).to.deep.equal(6400)
    })
})
