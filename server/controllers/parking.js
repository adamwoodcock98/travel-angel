const Parking = require("../models/parking.js");
const Address = require("../models/address.js");
const Trip = require("../models/trip.js");
const Upload = require("../models/upload.js");

const ParkingController = {
  Index: async (req, res) => {
    const userId = req.params.id;
    const tripId = req.params.tripId;
    const parkingBookings = await Parking.find({
      user: userId,
      trip: tripId,
    })
      .populate("address")
      .populate("uploads");

    res.json({ bookings: parkingBookings });
  },
  New: async (req, res) => {
    const data = req.body;

    try {
      const address = new Address({
        buildingNumber: data.buildingNumber,
        buildingName: data.buildingName,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        postalCode: data.postalCode,
        stateCounty: data.stateCounty,
        countryCode: data.countryCode,
      });

      const saveAddress = await address.save();

      const parking = new Parking({
        startDate: data.startDate,
        endDate: data.endDate,
        airport: data.airport,
        type: data.type,
        regPlate: data.regPlate,
        company: data.company,
        contactNumber: data.contactNumber,
        bookingReference: data.bookingReference,
        notes: data.notes,
        address: saveAddress,
        user: data.user,
        trip: data.trip,
      });

      await parking.save();

      const trip = await Trip.findById(data.trip);

      trip.parking.push(parking);

      await trip.save();

      res.status(201).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
  Upload: async (req, res) => {
    const parkingId = req.params.id;
    const file = req.file.filename;
    const filename = req.file.originalname;

    try {
      const upload = new Upload({ name: filename, file: file });

      await upload.save();

      const foundParking = await Parking.findById(parkingId);

      foundParking.uploads.push(upload);

      await foundParking.save();

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
    const id = req.params.id;
    try {
      const parking = await Parking.findById(id);
      parking.startDate = data.startDate;
      parking.endDate = data.endDate;
      parking.airport = data.airport;
      parking.type = data.type;
      parking.regPlate = data.regPlate;
      parking.company = data.company;
      parking.contactNumber = data.contactNumber;
      parking.bookingReference = data.bookingReference;
      parking.notes = data.notes;

      await parking.save();

      const address = await Address.findById(parking.address._id);
      address.buildingNumber = data.buildingNumber;
      address.buildingName = data.buildingName;
      address.addressLine1 = data.addressLine1;
      address.addressLine2 = data.addressLine2;
      address.city = data.city;
      address.postalCode = data.postalCode;
      address.stateCounty = data.stateCounty;
      address.countryCode = data.countryCode;

      await address.save();

      res.status(202).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Parking.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);

      res.status(500).send();
    }
  },
};

module.exports = ParkingController;
