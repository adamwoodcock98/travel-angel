const Parking = require("../models/parking.js");
const Address = require("../models/address.js");

const ParkingController = {
  Index: async (req, res) => {
    const parkingBookings = await Parking.find().populate("address");

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
        // user: req.session.user,
      });

      await parking.save();
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = ParkingController;
