const Trip = require("../models/trip.js");
const Address = require("../models/address.js");
const Accommodation = require("../models/accommodation.js");
const Flight = require("../models/flight.js");
const Parking = require("../models/parking.js");
const Transfer = require("../models/transfer.js");

const TripController = {
  Index: async (req, res) => {
    const userId = req.params.id;
    try {
      const trips = await Trip.find({ user: userId })
        .populate("Accommodation")
        .populate("Flight")
        .populate("Parking")
        .populate("Transfer");

      res.json({ trips: trips });
    } catch (e) {
      console.log(e.message);
    }
  },

  Create: (req, res) => {
    const {
      name,
      destination,
      startDate,
      endDate,
      accommodation,
      flights,
      parking,
      transfers,
      user,
    } = req.body;

    const trip = new Trip({
      name,
      destination,
      startDate,
      endDate,
      accommodation,
      flights,
      parking,
      transfers,
      user,
    });

    trip.save().then(res.json("Trip saved successfully"));
  },
};

module.exports = TripController;
