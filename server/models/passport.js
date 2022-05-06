const mongoose = require("mongoose");

const passportSchema = mongoose.Schema({
  passportNumber: {
    type: String,
    required: true,
  },  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  dateOfIssue: {
    type: Date,
    required: true,
  },
  dateOfExpiry: {
    type: Date,
    required: true,
  },
  user: {
    type: Object,
  }
});

const Passport = mongoose.model("Passport", passportSchema);

module.exports = Passport;