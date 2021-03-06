const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  airport: String,
  type: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  regPlate: String,
  company: String,
  contactNumber: String,
  bookingReference: String,
  notes: String,
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

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
