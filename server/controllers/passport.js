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

  Edit: async (req, res) => {
    const passContents = req.body;
    const passId = req.params.id;
    try {
      const passport = await Passport.findById(passId);
      passport = passContents
      await passport.save()
      res.status(200).send();
     } catch(e) {
       res.status(500).send();
     }
  },

  Delete: async (req, res) => {
    const id = req.params.id;

    try {
      await Passport.deleteOne({ _id: id });

      res.status(200).send();
    } catch(e) {
      console.log(e.message);

      res.status(500).send();
    }
  },
};

module.exports = PassportController;
