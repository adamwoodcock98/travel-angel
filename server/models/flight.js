const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  departureTime: {
    type: Date,
    required: true,
  },
  airline: String,
  departureAirport: {
    type: String,
    required: true,
  },
  departureCity: {
    type: String,
    required: true,
  },
  departureTerminal: String,
  departureGate: String,
  arrivalAirport: {
    type: String,
    required: true,
  },
  arrivalCity: {
    type: String,
    required: true,
  },
  arrivalTerminal: String,
  arrivalGate: String,
  bookingReference: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
})

module.exports = flightSchema;