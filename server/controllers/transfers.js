const Transfer = require("../models/transfer.js");
const Address = require("../models/address.js");
const Trip = require("../models/trip.js");
const Upload = require("../models/upload.js");

const TransferController = {
  Index: async (req, res) => {
    const userId = req.params.id;
    const tripId = req.params.tripId;
    try {
      const outboundTransfer = await Transfer.find({
        isOutbound: true,
        user: userId,
        trip: tripId,
      })
        .populate("pickupAddress dropoffAddress")
        .populate("uploads");
      const inboundTransfer = await Transfer.find({
        isOutbound: false,
        user: userId,
        trip: tripId,
      })
        .populate("pickupAddress dropoffAddress")
        .populate("uploads");
      res.json({ outbound: outboundTransfer, inbound: inboundTransfer });
    } catch (e) {
      console.log(e.message);
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
      buildingNumber: dropoffAddress.buildingNumber,
      buildingName: dropoffAddress.buildingName,
      addressLine1: dropoffAddress.addressLine1,
      addressLine2: dropoffAddress.addressLine2,
      city: dropoffAddress.city,
      postalCode: dropoffAddress.postalCode,
      stateCounty: dropoffAddress.stateCounty,
      countryCode: dropoffAddress.countryCode,
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
  Upload: async (req, res) => {
    const transferId = req.params.id;
    const file = req.file.filename;
    const filename = req.file.originalname;

    try {
      const upload = new Upload({ name: filename, file: file });

      await upload.save();

      const foundTransfer = await Transfer.findById(transferId);

      foundTransfer.uploads.push(upload);

      await foundTransfer.save();

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
};

module.exports = TransferController;
