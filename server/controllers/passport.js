const Passport = require("../models/passport.js");

const PassportController = {
  Index: (req, res) => {
    const user = req.session.user;
    Passport.find({}, (err, passport) => {
      if (err) {
        throw err;
      }
      res.json({ passport: passport });
    });
  },

  New: (req, res) => {
    const passport = new Passport(req.body);
    // passport.user = req.sessions.user;
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
