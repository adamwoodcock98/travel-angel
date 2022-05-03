const mongoose = require("mongoose");

require("../mongodb_helper");
const Address = require("../../models/address.js");

describe("Address model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.addresses.drop(() => {
      Address.syncIndexes(() => {
        done();
      })
    });
  });

  it("stores a building name", () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      city: "London",
      postalCode: "E1 6LT",
    });
    expect(address.buildingName).toEqual("Makers");
  });

  it("stores a building number", () => {
    const address = new Address({
      buildingNumber: "50-52",
      addressLine1: "Commercial Street",
      city: "London",
      postalCode: "E1 6LT",
    });
    expect(address.buildingNumber).toEqual("50-52");
  });

  it("stores the first line of an address", () => {
    const address = new Address({
      buildingNumber: "50-52",
      addressLine1: "Commercial Street",
      city: "London",
      postalCode: "E1 6LT",
    });
    expect(address.addressLine1).toEqual("Commercial Street");
  });

  it("stores the first line of an address as a required field", async () => {
    const address = new Address({
      buildingNumber: "50-52",
      city: "London",
      postalCode: "E1 6LT",
    });
    await expect(address.save()).rejects.toThrow();
  });

  it("stores the second line of an address", () => {
    const address = new Address({
      buildingNumber: "50-52",
      addressLine1: "Commercial Street",
      addressLine2: "somewhere in central",
      city: "London",
      postalCode: "E1 6LT",
    });
    expect(address.addressLine2).toEqual("somewhere in central");
  });

  it("stores a city", () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      city: "London",
      postalCode: "E1 6LT",
    });
    expect(address.city).toEqual("London");
  });

  it("stores a city as a required field", async () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      postalCode: "E1 6LT",
    });
    await expect(address.save()).rejects.toThrow();
  });

  it("stores a state or county", () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      city: "London",
      stateCounty: "City of London",
      postalCode: "E1 6LT",
    });
    expect(address.stateCounty).toEqual("City of London");
  });

  it("stores a postal code", () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      city: "London",
      postalCode: "E1 6LT",
    });
    expect(address.postalCode).toEqual("E1 6LT");
  });

  it("stores a postal code as a required field", async () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      city: "London",
    });
    await expect(address.save()).rejects.toThrow();
  });

  it("stores a country", () => {
    const address = new Address({
      buildingName: "Makers",
      addressLine1: "Commercial Street",
      city: "London",
      postalCode: "E1 6LT",
      countryCode: "GB",
    });
    expect(address.countryCode).toEqual("GB");
  });

});