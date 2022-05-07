const CovidTest = require("../models/covidTest.js");
const VaccineDose = require("../models/vaccineDose.js");
const Vaccinations = require("../models/vaccinations.js");

const CovidController = {
  Index: async (req, res) => {
    res.json({ message: "Welcome to Covid" });
  },

  NewTest: async (req, res) => {
    const data = req.body
    console.log(data)

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
      const savedTest = await test.save();
      console.log(savedTest)
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
      console.log("dose: ", savedVaccine);

      const userVaccinationCard = await Vaccinations.find();
      console.log("the cards:", userVaccinationCard);
      if (userVaccinationCard.length) {
        userVaccinationCard[0].vaccineDoses.push(savedVaccine._id);
        userVaccinationCard[0].vaccinationStatus = status;
        const savedVaccinationCard = await userVaccinationCard[0].save();
        console.log("card update: ", savedVaccinationCard[0]);
      } else {
        const newVaccinationCard = new Vaccinations({
          vaccineDoses: savedVaccine._id,
          vaccinationStatus: status,
        });
        const savedVaccinationCard = await newVaccinationCard.save();
        console.log("card new: ", savedVaccinationCard[0]);
      }

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = CovidController;
