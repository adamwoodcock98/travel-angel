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
  arrivalTerminal: String,
  arrivalGate: String,
  bookingReference: String,
  isOutbound: {
    type: Boolean,
    required: true,
  },
<<<<<<< HEAD
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
=======
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
>>>>>>> origin/main
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;