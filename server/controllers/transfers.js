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

  Update: async (req, res) => {
    const data = req.body;
    console.log(data);
    const transferId = req.params.id;
    try {
      const transfer = await Transfer.findById(transferId);
      console.log(transfer);
      transfer.pickupTime = data.pickupTime;
      transfer.dropoffTime = data.dropoffTime;
      transfer.isOutbound = data.isOutbound;
      transfer.company = data.company;
      transfer.contactNumber = data.contactNumber;
      transfer.bookingReference = data.bookingReference;
      transfer.user = data.user;
      transfer.trip = data.trip;

      await transfer.save();

      const pickupAddress = await Address.findById(transfer.pickupAddress);
      pickupAddress.buildingNumber = data.pickupAddress.buildingNumber;
      pickupAddress.buildingName = data.pickupAddress.buildingName;
      pickupAddress.addressLine1 = data.pickupAddress.addressLine1;
      pickupAddress.addressLine2 = data.pickupAddress.addressLine2;
      pickupAddress.city = data.pickupAddress.city;
      pickupAddress.postalCode = data.pickupAddress.postalCode;
      pickupAddress.stateCounty = data.pickupAddress.stateCounty;
      pickupAddress.countryCode = data.pickupAddress.countryCode;

      await pickupAddress.save();

      const dropoffAddress = await Address.findById(transfer.dropoffAddress);
      dropoffAddress.buildingNumber = data.dropoffAddress.buildingNumber;
      dropoffAddress.buildingName = data.dropoffAddress.buildingName;
      dropoffAddress.addressLine1 = data.dropoffAddress.addressLine1;
      dropoffAddress.addressLine2 = data.dropoffAddress.addressLine2;
      dropoffAddress.city = data.dropoffAddress.city;
      dropoffAddress.postalCode = data.dropoffAddress.postalCode;
      dropoffAddress.stateCounty = data.dropoffAddress.stateCounty;
      dropoffAddress.countryCode = data.dropoffAddress.countryCode;

      await dropoffAddress.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },
};

module.exports = TransferController;
