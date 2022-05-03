const mongoose = require("mongoose");
const Parking = require("../../models/parking");

require("../mongodb_helper")

describe("Parking model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.parkings.drop(() => {
      Transfer.syncIndexes(() => {
        done();
      })
    });
  });

  

});