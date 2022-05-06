const Passport = require("../models/passport.js");

const PassportController = {
  Index: (req, res) => {
    // const user = req.session.user._id
    Passport.find((err, passport) => {
      if (err) {
        throw err
      }
      res.json({ passport: passport })
    });
  },

  New: (req, res) => {
    // const user = req.session.user._id
    const passport = new Passport(req.body)
    passport.save((err) => {
      if (err) {
        throw err
      }
      res.json({ passport: passport, msg: "Fab, you just added a new Passport!"} );
    })
  }
}

module.exports = PassportController;