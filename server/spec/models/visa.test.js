const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Visa = require("../../models/visa.js");
require("../mongodb_helper");

describe("Visa model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.visas.drop(() => {
      Visa.syncIndexes(() => {
        done();
      })
    });
  });

  const mockUserID = new mongoose.Types.ObjectId();

  it("stores the start date", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const visa = new Visa({
      visaNumber: "ABC123",
      startDate: mockStartDate,
      endDate: mockEndDate,
      issuingCountry: "Australia",
      user: mockUserID,
    });
    expect(visa.startDate).toEqual(mockStartDate);
  });

  // it("stores the start date as a required value", async () => {
  //   advanceTo();
  //   const mockEndDate = new Date();
  //   const visa = new Visa({
  //     visaNumber: "ABC123",
  //     endDate: mockEndDate,
  //     issuingCountry: "Australia",
  //     user: mockUserID,
  //   });
  //   await expect(visa.save()).rejects.toThrow();
  // });

  it("stores the end date", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const visa = new Visa({
      visaNumber: "ABC123",
      startDate: mockStartDate,
      endDate: mockEndDate,
      issuingCountry: "Australia",
      user: mockUserID,
    });
    expect(visa.endDate).toEqual(mockEndDate);
  });

  // it("stores the start date as a required value", async () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const visa = new Visa({
  //     visaNumber: "ABC123",
  //     startDate: mockStartDate,
  //     issuingCountry: "Australia",
  //     user: mockUserID,
  //   });
  //   await expect(visa.save()).rejects.toThrow();
  // });

  it("stores the visa number", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const visa = new Visa({
      visaNumber: "ABC123",
      startDate: mockStartDate,
      endDate: mockEndDate,
      issuingCountry: "Australia",
      user: mockUserID,
    });
    expect(visa.visaNumber).toEqual("ABC123");
  });

  // it("stores the visa number as a required value", async () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const mockEndDate = new Date();
  //   const visa = new Visa({
  //     startDate: mockStartDate,
  //     endDate: mockEndDate,
  //     issuingCountry: "Australia",
  //     user: mockUserID,
  //   });
  //   await expect(visa.save()).rejects.toThrow();
  // });

  it("stores the issuing country", () => {
    advanceTo();
    const mockStartDate = new Date();
    const mockEndDate = new Date();
    const visa = new Visa({
      visaNumber: "ABC123",
      startDate: mockStartDate,
      endDate: mockEndDate,
      issuingCountry: "Australia",
      user: mockUserID,
    });
    expect(visa.issuingCountry).toEqual("Australia");
  });

  // it("stores the issuing country as a required value", async () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const mockEndDate = new Date();
  //   const visa = new Visa({
  //     visaNumber: "ABC123",
  //     startDate: mockStartDate,
  //     endDate: mockEndDate,
  //     user: mockUserID,
  //   });
  //   await expect(visa.save()).rejects.toThrow();
  // });

  // it("stores the user", () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const mockEndDate = new Date();
  //   const visa = new Visa({
    // visaNumber: "ABC123",
    // startDate: mockStartDate,
    // endDate: mockEndDate,
    // issuingCountry: "Australia",
    // user: mockUserID,
  //   });
  //   expect(visa.user).toEqual(mockUserID);
  // });

  // it("stores the user as a required field", async () => {
  //   advanceTo();
  //   const mockStartDate = new Date();
  //   const mockEndDate = new Date();
  //   const visa = new visa({
    // visaNumber: "ABC123",
    // startDate: mockStartDate,
    // endDate: mockEndDate,
    // issuingCountry: "Australia",
    // user: mockUserID,
  //   });
  //   await expect(visa.save()).rejects.toThrow();
  // });

});
