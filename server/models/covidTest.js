const mongoose = require("mongoose");

const covidTestSchema = mongoose.Schema({
  testType: {
    type: String,
    required: true,
  },
  entryType: {
    type: String,
    required: true,
  },
  result: String,
  testDate: Date,
  testFromDate: Date,
  resultByDate: Date,
  validToDate: Date,
  testNumber: String,
  testCountry: String,
  testProvider: String,
});

const CovidTest = mongoose.model("CovidTest", covidTestSchema);

module.exports = CovidTest;