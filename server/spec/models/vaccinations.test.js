const mongoose = require("mongoose");
const { advanceTo } = require("jest-date-mock");
const Vaccinations = require("../../models/vaccinations");
require("../mongodb_helper");

describe("Vaccinations model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.vaccinations.drop(() => {
      Vaccinations.syncIndexes(() => {
        done();
      });
    });
  });

  const mockUserID = mongoose.Types.ObjectId();
  const mockVaccineDose = mongoose.Types.ObjectId();

  it("Stores the vaccination status", () => {
    const vaccinations = new Vaccinations({
      vaccinationStatus: "Partially vaccinated",
      user: mockUserID,
    });

    expect(vaccinations.vaccinationStatus).toEqual("Partially vaccinated");
  });

  it("Stores a default vaccination status", () => {
    const vaccinations = new Vaccinations({
      user: mockUserID,
    });

    expect(vaccinations.vaccinationStatus).toEqual("Unvaccinated");
  });

  it("Stores an array of vaccines", () => {
    const vaccinations = new Vaccinations({
      vaccineDoses: [mockVaccineDose],
      user: mockUserID,
    });

    expect(vaccinations.vaccineDoses).toEqual([mockVaccineDose]);
  });

  it("Stores a user", () => {
    const vaccinations = new Vaccinations({
      vaccinationStatus: "Partially vaccinated",
      user: mockUserID,
    });

    expect(vaccinations.user).toEqual(mockUserID);
  });

  it("Stores a user as a required field", async () => {
    const vaccinations = new Vaccinations({
      vaccinationStatus: "Partially vaccinated",
    });

    await expect(vaccinations.save()).rejects.toThrow();
  });

});