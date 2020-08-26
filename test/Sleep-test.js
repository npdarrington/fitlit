const chai = require('chai');
const expect = chai.expect;
const sleepData = require('./sleepTestData');
const userData = require('./userTestData');
const Sleep = require('../src/Sleep');

describe('Sleep', () => {
  let sleep;
  beforeEach(() => {
    sleep = new Sleep(sleepData);
  });
});