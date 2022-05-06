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
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  regPlate: String,
  company: String,
  contactNumber: Number,
  bookingRefernce: String,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
