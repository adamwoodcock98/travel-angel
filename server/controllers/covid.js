const CovidTest = require("../models/covidTest.js");
const VaccineDose = require("../models/vaccineDose.js");
const Vaccinations = require("../models/vaccinations.js");

const CovidController = {
  Index: async (req, res) => {
    try {
      let vaccineToPass;
      const vaccinationData = await Vaccinations.find().populate("vaccineDoses");
      if (vaccinationData) {
        vaccineToPass = vaccinationData;
      } else {
        vaccineToPass = await new Vaccinations({vaccinationStatus: "Unvaccinated"}).save();
      }

      const testData = await CovidTest.find();

      res.json({ vaccinations: vaccineToPass, tests: testData });
      res.status(200).send();
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  NewTest: async (req, res) => {
    const data = req.body
    const test = new CovidTest({
      testType: data.testType,
      entryType: data.entryType,
      result: data.result,
      testDate: data.testDate,
      testFromDate: data.testFromDate,
      resultByDate: data.resultByDate,
      validToDate: data.validToDate,
      testNumber: data.testNumber,
      testCountry: data.testCountry,
      testProvider: data.testProvider,
    });

    try {
      await test.save();
      res.status(200).send()
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  NewVaccination: async (req, res) => {
    const data = req.body;

    let status;
    if (data.dose === "1st Dose") status = "Partially vaccinated";
    if (data.dose === "2nd Dose" || data.dose === "Primary Dose") status = "Fully Vaccinated";
    if (data.dose === "Booster") status = "Fully Vaccinated + Boosted";

    const vaccination = new VaccineDose({
      dose: data.dose,
      date: data.date,
      type: data.type,
    });

    try {
      const savedVaccine = await vaccination.save();

      const userVaccinationCard = await Vaccinations.findById(req.params.id);
      console.log(userVaccinationCard.vaccineDoses)
      
      userVaccinationCard.vaccineDoses.push(savedVaccine._id);
      userVaccinationCard.vaccinationStatus = status;
      await userVaccinationCard.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  UpdateTest: async (req, res) => {
    const data = req.body
    try {
      const test = await CovidTest.findById(data.testID);
      console.log("the test", test)
      test.testType = data.testType;
      test.entryType = data.entryType;
      test.result = data.result;
      test.testDate = data.testDate;
      test.testFromDate = data.testFromDate;
      test.resultByDate = data.resultByDate;
      test.validToDate = data.validToDate;
      test.testNumber = data.testNumber;
      test.testCountry = data.testCountry;
      test.testProvider = data.testProvider;
      console.log("lager test", test)
      await test.save();
      res.status(200).send();
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }

  },
};

module.exports = CovidController;
