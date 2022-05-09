const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  accommodation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
  parking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
  transfers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transfer",
    },
  ],
  visas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visa",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
