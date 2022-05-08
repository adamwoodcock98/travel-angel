const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");

require("../mongodb_helper");
const Trip = require("../../models/trip.js");

describe("Trip model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.trips.drop(() => {
      Trip.syncIndexes(() => {
        done();
      });
    });
  });

  const mockUser = new mongoose.Types.ObjectId();
  const mockAccommodation = new mongoose.Types.ObjectId();
  const mockFlight = new mongoose.Types.ObjectId();
  const mockParking = new mongoose.Types.ObjectId();
  const mockTransfer = new mongoose.Types.ObjectId();
  const mockVisa = new mongoose.Types.ObjectId();
  const mockDate = new Date();
  const mockEndDate = new Date(2018, 11, 24, 10, 33, 30, 0);

  it("has a name", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: new Date(),
      endDate: new Date(),
    });
    expect(trip.name).toEqual("Barcelona 2023");
  });

  it("has a startDate", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
    });
    expect(trip.startDate).toEqual(mockDate);
  });

  it("has an endDate", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
    });
    expect(trip.endDate).toEqual(mockEndDate);
  });

  it("has a user", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
    });
    expect(trip.user).toEqual(mockUser);
  });

  it("has an accommodation array", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
      accommodation: [mockAccommodation],
    });
    expect(trip.accommodation).toEqual([mockAccommodation]);
  });

  it("has a flights array", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
      flights: [mockFlight],
    });
    expect(trip.flights).toEqual([mockFlight]);
  });

  it("has a parking array", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
      parking: [mockParking],
    });
    expect(trip.parking).toEqual([mockParking]);
  });

  it("has a transfers array", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
      transfers: [mockTransfer],
    });
    expect(trip.transfers).toEqual([mockTransfer]);
  });

  it("has a visas array", () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
      visas: [mockVisa],
    });
    expect(trip.visas).toEqual([mockVisa]);
  });

  it("stores the user as a required value", async () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      endDate: mockEndDate,
    });
    await expect(trip.save()).rejects.toThrow();
  });

  it("stores the name as a required value", async () => {
    advanceTo();

    const trip = new Trip({
      startDate: mockDate,
      endDate: mockEndDate,
      user: mockUser,
    });
    await expect(trip.save()).rejects.toThrow();
  });

  it("stores the startDate as a required value", async () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      endDate: mockEndDate,
      user: mockUser,
    });
    await expect(trip.save()).rejects.toThrow();
  });

  it("stores the endDate as a required value", async () => {
    advanceTo();

    const trip = new Trip({
      name: "Barcelona 2023",
      startDate: mockDate,
      user: mockUser,
    });
    await expect(trip.save()).rejects.toThrow();
  });
});
