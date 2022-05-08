const mongoose = require("mongoose");
const Passport = require("../../models/passport.js");
require("../mongodb_helper");

describe("Transfer model", () => {
  beforeAll((done) => {
    mongoose.connection.collections.passports.drop(() => {
      Passport.syncIndexes(() => {
        done();
      });
    });
  });

  const mockDate = new Date();
  const passport = new Passport({
    passportNumber: "Passport Number",
    firstName: "First Name",
    lastName: "Last Name",
    nationality: "Nationality",
    country: "Country",
    dob: mockDate,
    gender: "M",
    placeOfBirth: "Place of Birth",
    dateOfIssue: mockDate,
    dateOfExpiry: mockDate,
    user: { name: "User Name" },
  });

  it("stores the passportNumber", () => {
    expect(passport.passportNumber).toEqual("Passport Number");
  });

  it("stores the first name", () => {
    expect(passport.firstName).toEqual("First Name");
  });

  it("stores the last name", () => {
    expect(passport.lastName).toEqual("Last Name");
  });

  it("stores the nationality", () => {
    expect(passport.nationality).toEqual("Nationality");
  });

  it("stores the country", () => {
    expect(passport.country).toEqual("Country");
  });

  it("stores the date of birth", () => {
    expect(passport.dob).toEqual(mockDate);
  });

  it("stores the gender", () => {
    expect(passport.gender).toEqual("M");
  });

  it("stores the place of birth", () => {
    expect(passport.placeOfBirth).toEqual("Place of Birth");
  });

  it("stores the date of issue", () => {
    expect(passport.dateOfIssue).toEqual(mockDate);
  });

  it("stores the date of expiry", () => {
    expect(passport.dateOfExpiry).toEqual(mockDate);
  });

  it("stores the passportNumber", () => {
    expect(passport.user).toEqual({ name: "User Name" });
  });
});
