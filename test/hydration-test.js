const chai = require('chai')
const expect = chai.expect
const Hydration = require('../src/Hydration.js')
const hydrationTestData = require('./hydrationTestData.js')
let hydration;
beforeEach(function(){
    hydration = new Hydration()
})
describe('Hydration',()=>{
    it('Should return average fluid ounces consumed per day for all time',()=>{
        expect(Hydration.returnAverergeUserFluidOuncesConsumedAllTime(UserID)).to.equal()
    })
    it('should return how many fluid ounces a user consumed for a specific day ',()=>{
        expect(Hydration.returnAveragefluidOuncesForSpecificDay(UserID,Day)).to.equal()

    })
    it('Should return many fluid ounces of water consumed each day over the course of a week',()=>{
        expect(Hydration.returnUserWeeklyFluidConsumption(UserID,StartingDay)).to.equal()
        
    })
})
