const Transfer = require("../models/transfer.js");
const Address = require("../models/address.js")

const TransferController = {
  Index: async (req, res) => {
      try {
        const outboundTransfer = await Transfer.find({ isOutbound: true }).populate("pickupAddress dropoffAddress");
        const inboundTransfer = await Transfer.find({ isOutbound: false }).populate("pickupAddress dropoffAddress");
        // console.log(outboundTransfer, inboundTransfer)
        res.json({ outbound: outboundTransfer, inbound: inboundTransfer });
      } catch(e) {
        console.log(e.message)
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
      bookingReference} = req.body

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
      const pickupAddressObject = result
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
          // user: 
        });
        transfer
          .save()
          .then(() => 
            res.json({ message: "Amazing, you've just added a new transfer!"})
          )
          .catch((err) => console.log(err.message)
          )
      })
    })
  }
}

module.exports = TransferController;