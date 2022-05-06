const Parking = require("../models/parking.js");

const ParkingController = {
  Index: async (req, res) => {
    const parkingBookings = Parking.find();

    res.json({ bookings: parkingBookings});
  },
  New: (req, res) => {
    res.json({message: "welcome to parking"})
  }
}

module.exports = ParkingController;