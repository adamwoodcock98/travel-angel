const Accommodation = require("../models/accommodation.js");
const Address = require("../models/address.js");
const User = require("../models/user.js");
const Trip = require("../models/trip.js");
const Upload = require("../models/upload.js");

const AccommodationController = {
  New: async (req, res) => {
    const tripId = req.params.tripId;
    const userId = req.params.id;

    try {
      const accommodation = await Accommodation.find({
        user: userId,
        trip: tripId,
      })
        .populate("address")
        .populate("uploads");
        
      res.json({ accommodation: accommodation });
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Create: async (req, res) => {
    const data = req.body

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
        trip: data.trip,
      });

      const savedAddress = await address.save();

      const accommodation = new Accommodation({
        name: data.name,
        contactNumber: data.contactNumber,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        bookingReference: data.bookingReference,
        address: savedAddress._id,
        user: data.user,
        trip: data.trip,
      });

      const savedAccommodation = await accommodation.save();

      const currentTrip = await Trip.findById(data.trip);
      currentTrip.accommodation.push(savedAccommodation._id);

      await currentTrip.save()

      res.status(200).send();
    } catch(e) {
      console.log(e);
      res.status(500).send();
    }
  },
  Upload: async (req, res) => {
    const accommodationId = req.params.id;
    const file = req.file.filename;
    const filename = req.file.originalname;

    try {
      const upload = new Upload({ name: filename, file: file });

      await upload.save();

      const foundAccommodation = await Accommodation.findById(accommodationId);

      foundAccommodation.uploads.push(upload);

      await foundAccommodation.save();

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
    try {
      const accommodation = await Accommodation.findById(
        req.params.id
      ).populate("address");
      console.log(accommodation);
      accommodation.name = data.name;
      accommodation.contactNumber = data.contactNumber;
      accommodation.checkInDate = data.checkInDate;
      accommodation.checkOutDate = data.checkOutDate;
      accommodation.checkInTime = data.checkInTime;
      accommodation.checkOutTime = data.checkOutTime;
      accommodation.bookingReference = data.bookingReference;

      await accommodation.save();

      const address = await Address.findById(accommodation.address._id);
      address.buildingNumber = data.buildingNumber;
      address.buildingName = data.buildingName;
      address.addressLine1 = data.addressLine1;
      address.addressLine2 = data.addressLine2;
      address.city = data.city;
      address.postalCode = data.postalCode;
      address.stateCounty = data.stateCounty;
      address.countryCode = data.countryCode;

      await address.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Accommodation.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = AccommodationController;
