const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  buildingNumber: String,
  buildingName: String,
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: String,
  city: {
    type: String,
    required: true,
  },
  stateCounty: String,
  postalCode: {
    type: String,
    required: true,
  },
  countryCode: String,
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;