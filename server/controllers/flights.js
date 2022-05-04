const Flight = require("../models/flight.js");

const FlightsController = {
  Index: (req, res) => {
    
  },

  New: (req, res) => {
    res.json({ message: "Fab, you just added a new flight!"} );
  }
}

module.exports = FlightsController;