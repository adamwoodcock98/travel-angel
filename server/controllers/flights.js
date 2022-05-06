const Flight = require("../models/flight.js");

const FlightsController = {
  Index: async (req, res) => {
    const outboundFlight = await Flight.find({ isOutbound: true });
    const inboundFlight = await Flight.find({ isOutbound: false });

    res.json({ outbound: outboundFlight, inbound: inboundFlight });
  },

  New: async (req, res) => {
    const data = req.body;

    console.log("the user: ", req.session.user)

    try {
      const flight = new Flight({
        flightNumber: data.flightNumber,
        departureTime: data.departureTime,
        departureDate: data.departureDate,
        airline: data.airline,
        departureAirport: data.departureAirport,
        departureTerminal: data.departureTerminal,
        departureCity: data.departureCity,
        departureGate: data.departureGate,
        arrivalAirport: data.arrivalAirport,
        arrivalTerminal: data.arrivalTerminal,
        arrivalCity: data.arrivalCity,
        arrivalGate: data.arrivalGate,
        bookingReference: data.bookingReference,
        isOutbound: data.isOutbound,
        user: req.session.user,
      });

      const saveFlight = await flight.save();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  },
};

module.exports = FlightsController;
