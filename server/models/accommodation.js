const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  // checkInTime: "",
  // checkOutTime: "",
  // bookingReference: "",
  address: "",
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
