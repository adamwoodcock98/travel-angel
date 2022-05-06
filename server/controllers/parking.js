const Parking = require("../models/parking.js");

const ParkingController = {
  Index: (req, res) => {
    res.json({message: "welcome to parking"})
  },
  New: (req, res) => {
    res.json({message: "welcome to parking"})
  }
}

module.exports = ParkingController;