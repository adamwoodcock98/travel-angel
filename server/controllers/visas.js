const Visa = require("../models/visa.js")

const VisasController = {
  Index: (res, req) => {},

  New: async (req, res) => {
    const data = req.body;

    try {
      const visa = new Visa({
        visaNumber: data.visaNumber,
        startDate: data.startDate,
        endDate: data.endDate,
        issuingCountry: data.issuingCountry,
        // user:
      });

      await visa.save();

      res.status(200).send();
    } catch(e){
        console.log(e.message)
        res.status(500).send(e)
    } 
  },
};

module.exports = VisasController;
