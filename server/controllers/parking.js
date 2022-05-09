const Parking = require("../models/parking.js");
const Address = require("../models/address.js");

const ParkingController = {
  Index: async (req, res) => {
    const userId = req.params.id;
    const parkingBookings = await Parking.find({ user: userId }).populate(
      "address"
    );

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

      console.log(data.user)

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
      });

      await parking.save();
      res.status(201).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Update: async (req, res) => {
    const data = req.body
    const id = req.params.id
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

      const address = await Address.findById(data.address._id);
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
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = ParkingController;
