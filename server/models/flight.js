const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  flightNumber: String,
  departureTime: {
    type: String,
    required: true,
  },
  departureDate: {
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
  arrivalDate: Date,
  arrivalTime: String,
  arrivalTerminal: String,
  arrivalGate: String,
  bookingReference: String,
  isOutbound: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
  ],
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
