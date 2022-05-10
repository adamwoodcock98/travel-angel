const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Accommodation = require("../../models/accommodation.js");
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
  const mockUserID = new mongoose.Types.ObjectId();
  const mockTripID = new mongoose.Types.ObjectId();
  const name = "Hilton London";
  const mockDate = new Date();
  const mockCheckOutDate = new Date();
  const contactNumber = 1234567891;
  const time = "11:00";
  const checkOutTime = "10:00";
  const bookingReference = "Your Booking Reference";

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

    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
    });

    expect(accommodation.checkOutDate).toEqual(mockDate);
  });

  it("stores the check in time", () => {
    advanceTo();
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
    const time = "11:00";
    const checkOutTime = "10:00";

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
    const time = "11:00";
    const checkOutTime = "10:00";

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

  it("stores the trip as a required value", async () => {
    advanceTo();
    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
      address: mockAddressID,
      user: mockUserID,
    });
    await expect(accommodation.save()).rejects.toThrow();
  });

  it("stores the user as a required value", async () => {
    advanceTo();
    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
      address: mockAddressID,
      trip: mockTripID,
    });
    await expect(accommodation.save()).rejects.toThrow();
  });

  it("stores the name as a required value", async () => {
    advanceTo();
    const accommodation = new Accommodation({
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
      address: mockAddressID,
      user: mockUserID,
      trip: mockTripID,
    });
    await expect(accommodation.save()).rejects.toThrow();
  });

  it("stores the checkInDate as a required value", async () => {
    advanceTo();
    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkOutDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
      address: mockAddressID,
      user: mockUserID,
      trip: mockTripID,
    });
    await expect(accommodation.save()).rejects.toThrow();
  });

  it("stores the checkOutDate as a required value", async () => {
    advanceTo();
    const accommodation = new Accommodation({
      name: name,
      contactNumber: contactNumber,
      checkInDate: mockDate,
      checkInTime: time,
      checkOutTime: checkOutTime,
      bookingReference: bookingReference,
      address: mockAddressID,
      user: mockUserID,
      trip: mockTripID,
    });
    await expect(accommodation.save()).rejects.toThrow();
  });
});
