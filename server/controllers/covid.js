const CovidTest = require("../models/covidTest.js");
const VaccineDose = require("../models/vaccineDose.js");
const Vaccinations = require("../models/vaccinations.js");

const CovidController = {
  Index: async (req, res) => {
    console.log("In the index route");
    const userId = req.params.id;
    const tripId = req.params.tripId;
    try {
      let vaccineToPass;
      const vaccinationData = await Vaccinations.findOne({
        user: userId,
      }).populate("vaccineDoses");
      if (vaccinationData) {
        vaccineToPass = vaccinationData;
      } else {
        vaccineToPass = await new Vaccinations({
          vaccinationStatus: "Unvaccinated",
          user: userId,
        }).save();
      }

      console.log(vaccineToPass);

      const testData = await CovidTest.find({ user: userId, trip: tripId }); //  addddddddd ttrrrriiippppppsssssssssss

      console.log(testData.length);

      res.json({ vaccinations: vaccineToPass, tests: testData });
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  NewTest: async (req, res) => {
    const data = req.body;
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
      user: data.user,
      trip: data.trip,
    });

    try {
      await test.save();
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  NewVaccination: async (req, res) => {
    const data = req.body;

    let status;
    if (data.dose === "1st Dose") status = "Partially vaccinated";
    if (data.dose === "2nd Dose" || data.dose === "Primary Dose")
      status = "Fully Vaccinated";
    if (data.dose === "Booster") status = "Fully Vaccinated + Boosted";

    const vaccination = new VaccineDose({
      dose: data.dose,
      date: data.date,
      type: data.type,
    });

    try {
      const savedVaccine = await vaccination.save();

      const userVaccinationCard = await Vaccinations.findById(req.params.id);

      userVaccinationCard.vaccineDoses.push(savedVaccine._id);
      userVaccinationCard.vaccinationStatus = status;
      await userVaccinationCard.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  UpdateVaccination: async (req, res) => {
    const data = req.body;
    const vaccinationCardId = req.params.id;
    const doseId = req.params.doseId;
    console.log(doseId);

    try {
      const dose = await VaccineDose.findById(doseId);
      dose.dose = data.dose;
      dose.date = data.date;
      dose.type = data.type;

      await dose.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  DeleteVaccination: async (req, res) => {
    const id = req.params.doseId;

    try {
      await VaccineDose.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  UpdateTest: async (req, res) => {
    const data = req.body;
    try {
      const test = await CovidTest.findById(data.testID);
      console.log("the test", test);
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
      console.log("lager test", test);
      await test.save();
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  DeleteTest: async (req, res) => {
    const id = req.params.id;

    try {
      await CovidTest.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(200).send();
    }
  },
};

module.exports = CovidController;
