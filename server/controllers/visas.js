const Visa = require("../models/visa.js");
const Trip = require("../models/trip.js");
const Upload = require("../models/upload.js");

const VisaController = {
  Index: async (req, res) => {
    const tripId = req.params.tripId;
    const userId = req.params.id;
    const visas = await Visa.find({ user: userId, trip: tripId }).populate(
      "uploads"
    );
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
  Upload: async (req, res) => {
    const visaId = req.params.id;
    const file = req.file.filename;
    const filename = req.file.originalname;

    try {
      const upload = new Upload({ name: filename, file: file });

      await upload.save();

      const foundVisa = await Visa.findById(visaId);

      foundVisa.uploads.push(upload);

      await foundVisa.save();

      res.json({ msg: "Upload Successful", type: "success", file: file });
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  },
  Download: async (req, res) => {
    const fileId = req.params.id;

    const file = await Upload.findById(fileId);

    const filename = file.file;

    res.download(`./public/uploads/${filename}`); // this is the absolute path to the file
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
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Visa.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);

      res.status(500).send();
    }
  },
};

module.exports = VisaController;
