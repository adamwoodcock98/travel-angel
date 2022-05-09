const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
  pickupTime: {
    type: Date,
    required: true,
  },
  dropoffTime: {
    type: Date,
    required: true,
  },
  pickupAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  dropoffAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  isOutbound: Boolean,
  company: String,
  contactNumber: Number,
  bookingReference: String,
  documents: [Buffer],
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
});

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
