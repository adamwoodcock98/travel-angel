const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Vaccinations = require("../../models/vaccinations");
require("../mongodb_helper");

describe("Vaccinations model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.vaccinations.drop(() => {
      Vaccinations.syncIndexes(() => {
        done();
      });
    });
  });

});