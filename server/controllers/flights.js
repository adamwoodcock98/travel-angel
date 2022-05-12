const Flight = require("../models/flight.js");
const Trip = require("../models/trip.js");
const Upload = require("../models/upload.js");

const FlightsController = {
  Index: async (req, res) => {
    try {
      const user = req.params.id;
      const tripId = req.params.tripId;
      const outboundFlight = await Flight.find({
        isOutbound: true,
        user: user,
        trip: tripId,
      }).populate("uploads");
      const inboundFlight = await Flight.find({
        isOutbound: false,
        user: user,
        trip: tripId,
      }).populate("uploads");
      res.json({
        outbound: outboundFlight,
        inbound: inboundFlight,
        user: user,
      });
      res.status(200).send();
    } catch (e) {
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
        arrivalDate: data.arrivalDate,
        arrivalTime: data.arrivalTime,
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
  Upload: async (req, res) => {
    const flightId = req.params.id;
    const file = req.file.filename;
    const filename = req.file.originalname;

    try {
      const upload = new Upload({ name: filename, file: file });

      await upload.save();

      const foundFlight = await Flight.findById(flightId);

      foundFlight.uploads.push(upload);

      await foundFlight.save();

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
    try {
      const flight = await Flight.findById(req.params.id);
      flight.flightNumber = data.flightNumber;
      flight.departureTime = data.departureTime;
      flight.departureDate = data.departureDate;
      flight.airline = data.airline;
      flight.departureAirport = data.departureAirport;
      flight.departureTerminal = data.departureTerminal;
      flight.departureCity = data.departureCity;
      flight.departureGate = data.departureGate;
      flight.arrivalAirport = data.arrivalAirport;
      flight.arrivalTerminal = data.arrivalTerminal;
      flight.arrivalCity = data.arrivalCity;
      flight.arrivalGate = data.arrivalGate;
      flight.arrivalDate = data.arrivalDate;
      flight.arrivalTime = data.arrivalTime;
      flight.bookingReference = data.bookingReference;
      flight.isOutbound = data.isOutbound;
      await flight.save();

      res.status(200).send();
    } catch (e) {
      console.log(e.message);
      res.status(500).send();
    }
  },

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Flight.deleteOne({ _id: id });

      res.status(200).send();
    } catch (e) {
      console.log(e.message);

      res.status(500).send();
    }
  },
};

module.exports = FlightsController;
