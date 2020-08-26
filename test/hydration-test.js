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
        expect(hydration.returnUserWeeklyFluidConsumption(12,"2019/06/16")).to.deep.equal([{
             "2019/06/16": 56
             },
            {
              "2019/06/17": 88
             },
             {
               "2019/06/18": 29
             },
             {
               "2019/06/19": 46
             },
             {
               "2019/06/20": 31
             },
             {
               "2019/06/21": 20
             },
             {
               "2019/06/22": 76
             }])
        
    })
})
