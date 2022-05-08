const mongoose = require("mongoose");

const vaccineDoseSchema = mongoose.Schema({
  dose: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
});

const VaccineDose = mongoose.model("VaccineDose", vaccineDoseSchema);

module.exports = VaccineDose;