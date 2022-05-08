const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Passport = require("../../models/passport.js");
require("../mongodb_helper");

describe("Transfer model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.accommodations.drop(() => {
      Accommodation.syncIndexes(() => {
        done();
      });
    });
  });

  const mockAddressID = new mongoose.Types.ObjectId();
  // const mockDropoffID = new mongoose.Types.ObjectId();
  // const mockUserID = new mongoose.Types.ObjectId();

  it("stores the name", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();

    const accommodation = new Accommodation({
      name: name,
      checkInDate: mockDate,
      checkOutDate: mockDate,
    });

    expect(accommodation.name).toEqual(name);
  });

  it("stores the contact number", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const contactNumber = 1234567891;

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
    });

    expect(accommodation.contactNumber).toEqual(contactNumber);
  });

  it("stores the check in date", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const mockCheckOutDate = new Date();
    const contactNumber = 1234567891;

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockCheckOutDate,
    });

    expect(accommodation.checkInDate).toEqual(mockDate);
  });

  it("stores the check out date", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const mockCheckOutDate = new Date();
    const contactNumber = 1234567891;

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
    });

    expect(accommodation.checkOutDate).toEqual(mockCheckOutDate);
  });

  it("stores the check in time", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const contactNumber = 1234567891;
    const time = "11:00";

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
    });

    expect(accommodation.checkInTime).toEqual(time);
  });

  it("stores the check out time", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const contactNumber = 1234567891;
    const time = "11:00";
    const checkOutTime = "10:00";

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
    });

    expect(accommodation.checkOutTime).toEqual(checkOutTime);
  });

  it("stores the booking reference", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const contactNumber = 1234567891;
    const time = "11:00";
    const checkOutTime = "10:00";
    const bookingReference = "Your Booking Reference";

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
    });

    expect(accommodation.bookingReference).toEqual(bookingReference);
  });

  it("stores the address object", () => {
    advanceTo();
    const name = "Hilton London";
    const mockDate = new Date();
    const contactNumber = 1234567891;
    const time = "11:00";
    const checkOutTime = "10:00";
    const bookingReference = "Your Booking Reference";

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
      address: mockAddressID,
    });

    expect(accommodation.address).toEqual(mockAddressID);
  });
});
