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

  Update: async (req, res) => {
    const data = req.body;
    try {
      const accommodation = await Accommodation.findById(req.params.id).populate("address");
      console.log(accommodation)
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
    } catch(e) {
      console.log(e.message);
      res.status(500).send();
    }
  }
};

module.exports = AccommodationController;
