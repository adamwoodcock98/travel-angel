const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Transfer = require("../../models/transfer.js");
require("../mongodb_helper");

describe("Transfer model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.transfers.drop(() => {
      Transfer.syncIndexes(() => {
        done();
      })
    });
  });

  const mockPickupID = new mongoose.Types.ObjectId();
  const mockDropoffID = new mongoose.Types.ObjectId();
  const mockUserID = new mongoose.Types.ObjectId();

  it("stores the pickup time", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    });
    expect(transfer.pickupTime).toEqual(mockPickupTime);
  });

  it("stores the pickup time as a required value", async () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    });
    await expect(transfer.save()).rejects.toThrow();
  });

  it("stores the dropoff time", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    });
    expect(transfer.pickupTime).toEqual(mockPickupTime);
  });

  it("stores the dropoff time as a required value", async () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    });
    await expect(transfer.save()).rejects.toThrow();
  });

  it("stored the pickup address", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    })
    expect(transfer.pickupAddress).toEqual(mockPickupID);
  });

  it("stores the pickup address as a required value", async () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    });
    await expect(transfer.save()).rejects.toThrow();
  });

  it("stored the dropoff address", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    })
    expect(transfer.dropoffAddress).toEqual(mockDropoffID);
  });

  it("stores the dropoff address as a required value", async () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      user: mockUserID,
    });
    await expect(transfer.save()).rejects.toThrow();
  });

  it("stores whether the journey is an outbound or return", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      isOutbound: true,
      user: mockUserID,
    })
    expect(transfer.isOutbound).toEqual(true);
  });

  it("stores a company name", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      company: "Sunny Holiday Airport Shuttle",
      user: mockUserID,
    })
    expect(transfer.company).toEqual("Sunny Holiday Airport Shuttle");
  });

  it("stores the companies contact number", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      contactNumber: 442012345676,
      user: mockUserID,
    })
    expect(transfer.contactNumber).toEqual(442012345676);
  });

  it("stores a booking reference", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      bookingReference: "ABX1892BV",
      user: mockUserID,
    })
    expect(transfer.bookingReference).toEqual("ABX1892BV");
  });
  
  it("stores a booking reference", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      bookingReference: "ABX1892BV",
      user: mockUserID,
    })
    expect(transfer.bookingReference).toEqual("ABX1892BV");
  });

  // test for a Buffer type

  it("stores a user ID", () => {
    advanceTo();
    const mockPickupTime = new Date();
    const mockDropoffTime = new Date();
    const transfer = new Transfer({
      pickupTime: mockPickupTime,
      dropoffTime: mockDropoffTime,
      pickupAddress: mockPickupID,
      dropoffAddress: mockDropoffID,
      user: mockUserID,
    })
    expect(transfer.user).toEqual(mockUserID);
  });

});