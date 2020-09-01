const chai = require('chai');
const expect = chai.expect;
const Hydration = require('../src/Hydration.js');
const hydrationTestData = require('./hydrationTestData.js');
let hydration;

beforeEach(() => {
  hydration = new Hydration(hydrationTestData);
});

describe('Hydration', () =>{
  it('Should return average fluid ounces consumed per day for all time', () => {
    expect(hydration.returnAverergeUserFluidOuncesConsumedAllTime(1)).to.equal(59);
  });
  it('Should Not return average fluid ounces consumed per day for all time given invalid user', () => {
    expect(hydration.returnAverergeUserFluidOuncesConsumedAllTime(98)).to.equal(undefined);
  });
  
  it('should return how many fluid ounces a user consumed for a specific day ', () => {
    expect(hydration.returnFluidOuncesForSpecificDay(18, "2019/06/17")).to.equal(76);
  });
  it('should Not return how many fluid ounces a user consumed for a specific day given an invalid user ', () => {
    expect(hydration.returnFluidOuncesForSpecificDay(98, "2020/06/17")).to.equal(undefined);
  });

  it('Should return fluid ounces of water consumed each day over the course of a week', () => {
    expect(hydration.returnUserWeeklyFluidConsumption(1, "2019/06/15")).to.deep.equal(
      [
        {date: "2019/06/21", numOunces: 50},
        {date: "2019/06/20", numOunces: 50},
        {date: "2019/06/19", numOunces: 91},
        {date: "2019/06/18", numOunces: 61},
        {date: "2019/06/17", numOunces: 96},
        {date: "2019/06/16", numOunces: 69},
        {date: "2019/06/15", numOunces: 37},
      ]
    );
  });
});
