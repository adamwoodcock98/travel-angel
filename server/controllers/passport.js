const Passport = require("../models/passport.js");

const PassportController = {
  Index: (req, res) => {
    const user = req.params.id;
    Passport.find({user: user}, (err, passport) => {
      if (err) {
        throw err;
      }
      res.json({ passport: passport });
    });
  },

  New: (req, res) => {
    const passport = new Passport(req.body);
    passport.save((err, passport) => {
      if (err) {
        throw err;
      }
      res.json({
        passport: passport,
        msg: "Passport added successfully!",
        type: "success",
      });
    });
  },
};

module.exports = PassportController;
