const Transfer = require("../models/transfer.js");
const Address = require("../models/address.js");
const Trip = require("../models/trip.js");

const TransferController = {
  Index: async (req, res) => {
    const userId = req.params.id;
    const tripId = req.params.tripId;
    try {
      const outboundTransfer = await Transfer.find({
        isOutbound: true,
        user: userId,
        trip: tripId,
      }).populate("pickupAddress dropoffAddress");
      const inboundTransfer = await Transfer.find({
        isOutbound: false,
        user: userId,
        trip: tripId,
      }).populate("pickupAddress dropoffAddress");
      res.json({ outbound: outboundTransfer, inbound: inboundTransfer });
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Create: (req, res) => {
    const {
      pickupTime,
      dropoffTime,
      pickupAddress,
      dropoffAddress,
      isOutbound,
      company,
      contactNumber,
      bookingReference,
      user,
      trip,
    } = req.body;

    const thePickupAddress = new Address({
      buildingNumber: pickupAddress.buildingNumber,
      buildingName: pickupAddress.buildingName,
      addressLine1: pickupAddress.addressLine1,
      addressLine2: pickupAddress.addressLine2,
      city: pickupAddress.city,
      postalCode: pickupAddress.postalCode,
      stateCounty: pickupAddress.stateCounty,
      countryCode: pickupAddress.countryCode,
    });

    const theDropoffAddress = new Address({
      buildingNumber: pickupAddress.buildingNumber,
      buildingName: pickupAddress.buildingName,
      addressLine1: pickupAddress.addressLine1,
      addressLine2: pickupAddress.addressLine2,
      city: pickupAddress.city,
      postalCode: pickupAddress.postalCode,
      stateCounty: pickupAddress.stateCounty,
      countryCode: pickupAddress.countryCode,
    });

    thePickupAddress.save().then((result) => {
      const pickupAddressObject = result;
      theDropoffAddress.save().then((result) => {
        const transfer = new Transfer({
          pickupTime: pickupTime,
          dropoffTime: dropoffTime,
          pickupAddress: pickupAddressObject,
          dropoffAddress: result,
          isOutbound: isOutbound,
          company: company,
          contactNumber: contactNumber,
          bookingReference: bookingReference,
          user: user,
          trip: trip,
        });
        transfer
          .save()
          .then(() =>
            Trip.findById(trip).then((thisTrip) => {
              thisTrip.transfers.push(transfer);
              thisTrip.save().then(
                res.json({
                  message: "Amazing, you've just added a new transfer!",
                })
              );
            })
          )
          .catch((err) => console.log(err.message));
      });
    });
  },
};

module.exports = TransferController;
