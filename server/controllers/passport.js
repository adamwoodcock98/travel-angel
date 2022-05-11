const Passport = require("../models/passport.js");

const PassportController = {
  Index: (req, res) => {
    const user = req.params.id;
    Passport.find({user: user}, (e, passport) => {
      if (e) {
        console.log(e.message);
        res.status(500).send();
      }
      res.json({ passport: passport });
    })
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

  Update: async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
      const passport = await Passport.findById(id);
      passport.passportNumber = data.passportNumber;
      passport.firstName = data.firstName;
      passport.lastName = data.lastName;
      passport.nationality = data.nationality;
      passport.country = data.country;
      passport.dob = data.dob;
      passport.gender = data.gender;
      passport.placeOfBirth = data.placeOfBirth;
      passport.dateOfIssue = data.dateOfIssue;
      passport.dateOfExpiry = data.dateOfExpiry;

      await passport.save();

      console.log(passport)

      res.status(200).send();
    } catch(e) {
      console.log(e);

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
