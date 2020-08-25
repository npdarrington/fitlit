const chai = require('chai')
const expect = chai.expect
const Hydration = require('../src/Hydration.js')
const hydrationTestData = require('./hydrationTestData.js')
let hydration;
beforeEach(function(){
    hydration = new Hydration(hydrationTestData)
})
describe('Hydration',()=>{
    it('Should return average fluid ounces consumed per day for all time',()=>{
        expect(hydration.returnAverergeUserFluidOuncesConsumedAllTime(1)).to.equal(59)
    })
    it('should return how many fluid ounces a user consumed for a specific day ',()=>{
        expect(hydration.returnFluidOuncesForSpecificDay(18,"2019/06/17")).to.equal(76)

    })
    it('Should return fluid ounces of water consumed each day over the course of a week',()=>{
        expect(hydration.returnUserWeeklyFluidConsumption(12,"2019/06/16")).to.deep.equal([56,88,29,46,31,20,76])
        
    })
})
