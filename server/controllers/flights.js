const Flight = require("../models/flight.js");

const FlightsController = {
  Index: (req, res) => {
    res.json({ message: "Welcome to Flights!" })
  },

  New: (req, res) => {
    res.json({ message: "Fab, you just added a new flight!"} );
  }
}