const Accommodation = require("../models/accommodation.js");

const AccommodationController = {
  Index: (req, res) => {
    res.json({ message: "Welcome to Accommodation!" });
  },

  New: (req, res) => {
    res.json({ message: "Fab! You just added a new accommodation!" });
  }
}

module.exports = AccommodationController;