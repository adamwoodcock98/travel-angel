const Visa = require("../models/visa.js");

const VisaController = {
  Index: async (req, res) => {
    const visas = await Visa.find();
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
      });

      await visa.save();
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = VisaController;