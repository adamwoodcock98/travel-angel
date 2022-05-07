const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const CovidTest = require("../../models/covidTest.js");
require("../mongodb_helper");

describe("Covid test model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.covidtests.drop(() => {
      CovidTest.syncIndexes(() => {
        done();
      });
    });
  });

});