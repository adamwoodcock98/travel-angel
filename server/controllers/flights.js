const Flight = require("../models/flight.js");

const FlightsController = {
  Index: async (req, res) => {
    const outboundFlight = await Flight.find({ isOutbound: true });
    const inboundFlight = await Flight.find({ isOutbound: false });

    res.json({ outbound: outboundFlight, inbound: inboundFlight })
  },

  New: (req, res) => {
    res.json({ message: "Fab, you just added a new flight!"} );
  }
}

module.exports = FlightsController;