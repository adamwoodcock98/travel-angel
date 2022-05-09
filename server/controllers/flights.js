const Flight = require("../models/flight.js");
const Trip = require("../models/trip.js");

const FlightsController = {
  Index: async (req, res) => {
    try {
      const user = req.params.id;
      const tripId = req.params.tripId;
      const outboundFlight = await Flight.find({
        isOutbound: true,
        user: user,
        trip: tripId,
      });
      const inboundFlight = await Flight.find({
        isOutbound: false,
        user: user,
        trip: tripId,
      });
      res.json({
        outbound: outboundFlight,
        inbound: inboundFlight,
        user: user,
      });
      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  New: async (req, res) => {
    const data = req.body;
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
        user: data.user,
        trip: data.trip,
      });

      await flight.save();

      const trip = await Trip.findById(data.trip);

      trip.flights.push(flight);

      await trip.save();

      res.status(200).send();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err);
    }
  },
};

module.exports = FlightsController;
