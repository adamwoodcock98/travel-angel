const mongoose = require("mongoose");
const transferSchema = require("./transfer.js");
const parkingSchema = require("./parking.js");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profilePicture: {
    type: String,
  },
  transfers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transfer",
    },
  ],
  parking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
    },
  ],
  accommodation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],
  visas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visa",
    },
  ],
  covidDocumentation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CovidDocumentation",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;