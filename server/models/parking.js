const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  
});

const Parking = mongoose.model("Parking", parkingSchema);
module.exports = Parking;
