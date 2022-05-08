const Trip = require("../models/trip.js");

const TripController = {
  Index: async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
      const trips = await Trip.find({ user: userId })
        .populate("accommodation")
        .populate("flights")
        .populate("parking")
        .populate("transfers");

      res.json({ trips: trips });
      console.log(trips);
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
