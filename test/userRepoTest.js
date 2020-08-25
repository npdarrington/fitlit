const chai = require('chai')
const expect = chai.expect
const UserRepo = require('src/userRepo.js')
const testData = require('test/userTestData.js')
const userRepo;
beforeEach(function(){
    userRepo = new UserRepo(testData)
})
describe('UserRepo',function(){
   
    it('Given a user’s ID, should return correct user data',function(){
        userRepo.returnUserData(1).deep.equal(
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
        userRepo.returnAverageStepCount().deep.equal(6400)
    }
}
