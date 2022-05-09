const Visa = require("../models/visa.js");
const Trip = require("../models/trip.js");

const VisaController = {
  Index: async (req, res) => {
    const tripId = req.params.tripId;
    const userId = req.params.id;
    const visas = await Visa.find({ user: userId, trip: tripId });
    res.json(visas);
  },

  Create: async (req, res) => {
    const data = req.body;

    try {
      const visa = new Visa({
        visaNumber: data.visaNumber,
        startDate: data.startDate,
        endDate: data.endDate,
        issuingCountry: data.issuingCountry,
        user: data.user,
        trip: data.trip,
      });

      await visa.save();

      const thisTrip = await Trip.findById(data.trip);

      thisTrip.visas.push(visa);

      await thisTrip.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = VisaController;
