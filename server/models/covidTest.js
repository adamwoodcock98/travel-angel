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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CovidTest = mongoose.model("CovidTest", covidTestSchema);

module.exports = CovidTest;
