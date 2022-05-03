const mongoose = require("mongoose");

require("../mongodb_helper");

describe("Parking model", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.parkings.drop(() => {
  //     Transfer.syncIndexes(() => {
  //       done();
  //     });
  //   });
  // });

  it("tests", () => {
    expect(1).toEqual(1);
  });
});
