const Visa = require("../models/visa.js");
const Trip = require("../models/trip.js");

const VisaController = {
  Index: async (req, res) => {
    try {
      const tripId = req.params.tripId;
      const userId = req.params.id;
      const visas = await Visa.find({ user: userId, trip: tripId });
      
      res.json(visas);
      res.status(200).send();
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }
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

  Update: async (req, res) => {
    const data = req.body;
    const visaId = req.params.id;
    try {
      const visa = await Visa.findById(visaId);
      visa.visaNumber = data.visaNumber;
      visa.startDate = data.startDate;
      visa.endDate = data.endDate;
      visa.issuingCountry = data.issuingCountry;

      await visa.save();

      res.status(200).send();
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Visa.deleteOne({ _id: id });

      res.status(200).send();
    } catch(e) {
      console.log(e.message);

      res.status(500).send();
    }
  }
};

module.exports = VisaController;
