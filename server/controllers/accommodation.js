const Accommodation = require("../models/accommodation.js");
const Address = require("../models/address.js");
const User = require("../models/user.js");

const AccommodationController = {
  New: async (req, res) => {
    userId = req.params.id;
    const accommodation = await Accommodation.find({ user: userId }).populate(
      "address"
    );
    res.json({ accommodation: accommodation });
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
      user,
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
        const accommodation = new Accommodation({
          name: name,
          contactNumber: contactNumber,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          bookingReference: bookingReference,
          address: address,
          user: user,
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
