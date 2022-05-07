const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Parking = require("../../models/parking.js");
require("../mongodb_helper");

describe("Parking model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.parkings.drop(() => {
      Parking.syncIndexes(() => {
        done();
      });
    });
  });

  const mockAddressID = mongoose.Types.ObjectId();
  const mockUserID = mongoose.Types.ObjectId();

  it("stores the start date", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      user: mockUserID,
    });
    expect(parking.startDate).toEqual(mockStartDate);
  });

  it("stores the start date as a required value", async () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      endDate: mockEndDate,
      address: mockAddressID,
      user: mockUserID,
    });
    await expect(parking.save()).rejects.toThrow();
  });

  it("stores the end date", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      user: mockUserID,
    });
    expect(parking.endDate).toEqual(mockEndDate);
  });

  it("stores the start date as a required value", async () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      address: mockAddressID,
      user: mockUserID,
    });
    await expect(parking.save()).rejects.toThrow();
  });

  it("stores the airport", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      airport: "Heathrow",
      address: mockAddressID,
      user: mockUserID,
    });
    expect(parking.airport).toEqual("Heathrow");
  });

  it("stores the car park type", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      type: "Long Stay",
      address: mockAddressID,
      user: mockUserID,
    });
    expect(parking.type).toEqual("Long Stay");
  });

  it("stores the address", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      user: mockUserID,
    });
    expect(parking.address).toEqual(mockAddressID);
  });

  it("stores the registration plate", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      regPlate: "DN65 OVP",
      user: mockUserID,
    });
    expect(parking.regPlate).toEqual("DN65 OVP");
  });

  it("stores the company", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      company: "Purple Parking",
      user: mockUserID,
    });
    expect(parking.company).toEqual("Purple Parking");
  });

  it("stores the contact number", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      contactNumber: "07912345678",
      user: mockUserID,
    });
    expect(parking.contactNumber).toEqual("07912345678");
  });

  it("stores the booking reference", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      bookingReference: "A273182",
      user: mockUserID,
    });
    expect(parking.bookingReference).toEqual("A273182");
  });

  it("stores the notes", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const parking = new Parking({
      startDate: mockStartDate,
      endDate: mockEndDate,
      address: mockAddressID,
      notes: "Take the second exit on the left, then press the yellow button",
      user: mockUserID,
    });
    expect(parking.notes).toEqual("Take the second exit on the left, then press the yellow button");
  });

  // it("stores the user", () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const mockEndDate = new Date();
  //   const parking = new Parking({
  //     startDate: mockStartDate,
  //     endDate: mockEndDate,
  //     address: mockAddressID,
  //     user: mockUserID,
  //   });
  //   expect(parking.user).toEqual(mockUserID);
  // });

  // it("stores the user as a required field", async () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const mockEndDate = new Date();
  //   const parking = new Parking({
  //     startDate: mockStartDate,
  //     endDate: mockEndDate,
  //     address: mockAddressID,
  //   });
  //   await expect(parking.save()).rejects.toThrow();
  // });

});
