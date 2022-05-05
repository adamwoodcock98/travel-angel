const Passport = require("../models/passport.js");

const PassportController = {
  Index: async (req, res) => {
    const user = req.session.user._id
    const passport = await Passport.findOne({ user: user });

    res.json({ passport: passport })
  },

  New: (req, res) => {
    const user = req.session.user._id
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