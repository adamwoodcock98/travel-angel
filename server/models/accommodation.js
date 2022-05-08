const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  checkInTime: String,
  checkOutTime: String,
  bookingReference: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);
module.exports = Accommodation;
