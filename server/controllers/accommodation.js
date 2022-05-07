const Accommodation = require("../models/accommodation.js");
const Address = require("../models/address.js");

const AccommodationController = {
  New: async (req, res) => {
    const accommodation = await Accommodation.find().populate("address");
    res.json(accommodation);
  },

  Create: (req, res) => {
    const {
      name,
      contactNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      bookingReference,
      buildingNumber,
      buildingName,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      stateCounty,
      countryCode,
    } = req.body;

    const address = new Address({
      buildingNumber: buildingNumber,
      buildingName: buildingName,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      postalCode: postalCode,
      stateCounty: stateCounty,
      countryCode: countryCode,
    });

    address
      .save()
      .then((address) => {
        console.log(address);
        const accommodation = new Accommodation({
          name: name,
          contactNumber: contactNumber,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          bookingReference: bookingReference,
          address: address,
        });
        accommodation
          .save()
          .then((accommodation) =>
            res.json({ msg: "Accommodation added successfully" })
          )
          .catch((err) =>
            res.status(400).json({ error: "Unable to add this accommodation" })
          );
      })
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this address" })
      );
  },
};

module.exports = AccommodationController;
