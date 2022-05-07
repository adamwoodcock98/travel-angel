const CovidTest = require("../models/covidTest.js");
const VaccineDose = require("../models/vaccineDose.js");
const Vaccinations = require("../models/vaccinations.js");

const CovidController = {
  Index: async (req, res) => {
    res.json({ message: "Welcome to Covid" })
  },

  NewTest: async (req, res) => {
    res.json({ message: "Welcome to Covid" })
  },

  NewVaccination: async (req, res) => {
    res.json({ message: "Welcome to Covid" })
  },
};

module.exports = CovidController;