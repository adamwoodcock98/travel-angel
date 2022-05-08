const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const CovidTest = require("../../models/covidTest.js");
require("../mongodb_helper");

describe("Covid test model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.covidtests.drop(() => {
      CovidTest.syncIndexes(() => {
        done();
      });
    });
  });

    advanceTo();
    const mockTestDate = new Date();
    const mockFromDate = new Date();
    const mockByDate = new Date();
    const mockToDate = new Date();

  it("Stores a test type", () => {
    const test = new CovidTest({
      testType: "PCR",
      isReminder: false
    });

    expect(test.testType).toEqual("PCR");
  });

  it("Stores a test type as a required field", async () => {
    const test = new CovidTest({
      isReminder: false
    });

    await expect(test.save()).rejects.toThrow();
  });

  it("Stores a result", () => {
    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      result: "Positive",
    });

    expect(test.result).toEqual("Positive");
  });

  it("Stores a testDate", () => {
    advanceTo();
    const mockDate = new Date();

    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      testDate: mockDate,
    });

    expect(test.testDate).toEqual(mockDate);
  });

  it("Stores a test from date", () => {
    advanceTo();
    const mockDate = new Date();

    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      testFromDate: mockDate,
    });

    expect(test.testFromDate).toEqual(mockDate);
  });

  it("Stores a date the user must have results by", () => {
    advanceTo();
    const mockDate = new Date();

    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      resultByDate: mockDate,
    });

    expect(test.resultByDate).toEqual(mockDate);
  });

  it("Stores a date the result is valid until", () => {
    advanceTo();
    const mockDate = new Date();

    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      validToDate: mockDate,
    });

    expect(test.validToDate).toEqual(mockDate);
  });

  it("Stores a test numbber", () => {
    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      testNumber: "MGG06350726",
    });

    expect(test.testNumber).toEqual("MGG06350726");
  });

  it("Stores a testing country", () => {
    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      testCountry: "UK",
    });

    expect(test.testCountry).toEqual("UK");
  });

  it("Stores a test provider", () => {
    const test = new CovidTest({
      testType: "PCR",
      isReminder: false,
      testProvider: "NHS",
    });

    expect(test.testProvider).toEqual("NHS");
  });

});