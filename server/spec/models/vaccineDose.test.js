const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const VaccineDose = require("../../models/vaccineDose.js");
require("../mongodb_helper");

describe("Vaccine dose model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.vaccinedoses.drop(() => {
      VaccineDose.syncIndexes(() => {
        done();
      });
    });
  });

  it("Stores a dose", () => {
    advanceTo();
    const mockDoseDate = new Date();

    const vaccine = new VaccineDose({
      dose: "1st Dose",
      date: mockDoseDate,
      type: "Pfizer/BioNTech (Comirnaty)",
    });

    expect(vaccine.dose).toEqual("1st Dose");
  });

  it("Stores a dose as a required field", async () => {
    advanceTo();
    const mockDoseDate = new Date();

    const vaccine = new VaccineDose({
      date: mockDoseDate,
      type: "Pfizer/BioNTech (Comirnaty)",
    });

    await expect(vaccine.save()).rejects.toThrow();
  });

  it("Stores a date", () => {
    advanceTo();
    const mockDoseDate = new Date();

    const vaccine = new VaccineDose({
      dose: "1st Dose",
      date: mockDoseDate,
      type: "Pfizer/BioNTech (Comirnaty)",
    });

    expect(vaccine.date).toEqual(mockDoseDate);
  });

  it("Stores a date as a required field", async () => {
    advanceTo();
    const mockDoseDate = new Date();

    const vaccine = new VaccineDose({
      dose: "1st Dose",
      type: "Pfizer/BioNTech (Comirnaty)",
    });

    await expect(vaccine.save()).rejects.toThrow();
  });

  it("Stores a vaccine type", () => {
    advanceTo();
    const mockDoseDate = new Date();

    const vaccine = new VaccineDose({
      dose: "1st Dose",
      date: mockDoseDate,
      type: "Pfizer/BioNTech (Comirnaty)",
    });

    expect(vaccine.type).toEqual("Pfizer/BioNTech (Comirnaty)");
  });

  it("Stores a vaccine type as a required field", async () => {
    advanceTo();
    const mockDoseDate = new Date();

    const vaccine = new VaccineDose({
      dose: "1st Dose",
      date: mockDoseDate,
    });

    await expect(vaccine.save()).rejects.toThrow();
  });

});