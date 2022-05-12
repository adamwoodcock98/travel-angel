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

  Create: async (req, res) => {
    console.log("it is going to the right route here", req.body.pickupTime);
    const data = req.body;

    try {
      const thePickupAddress = new Address({
        buildingNumber: data.pickupAddress.buildingNumber,
        buildingName: data.pickupAddress.buildingName,
        addressLine1: data.pickupAddress.addressLine1,
        addressLine2: data.pickupAddress.addressLine2,
        city: data.pickupAddress.city,
        postalCode: data.pickupAddress.postalCode,
        stateCounty: data.pickupAddress.stateCounty,
        countryCode: data.pickupAddress.countryCode,
      });

      const savedPickup = await thePickupAddress.save();

      const theDropoffAddress = new Address({
        buildingNumber: data.pickupAddress.buildingNumber,
        buildingName: data.pickupAddress.buildingName,
        addressLine1: data.pickupAddress.addressLine1,
        addressLine2: data.pickupAddress.addressLine2,
        city: data.pickupAddress.city,
        postalCode: data.pickupAddress.postalCode,
        stateCounty: data.pickupAddress.stateCounty,
        countryCode: data.pickupAddress.countryCode,
      });

      const savedDropoff = await theDropoffAddress.save();

      const transfer = new Transfer({
        pickupTime: data.pickupTime,
        dropoffTime: data.dropoffTime,
        pickupAddress: savedPickup._id,
        dropoffAddress: savedDropoff._id,
        isOutbound: data.isOutbound,
        company: data.company,
        contactNumber: data.contactNumber,
        bookingReference: data.bookingReference,
        user: data.user,
        trip: data.trip,
      });

      const savedTransfer = await transfer.save();

      const trip = Trip.findById(data.trip);
      trip.transfers.push(savedTransfer);

      await trip.save();

      res.status(200);
    } catch (e) {
      console.log(e.message);

      res.status(200).send();
    }
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

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Transfer.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);

      res.status(200).send();
    }
  },
};

module.exports = TransferController;
