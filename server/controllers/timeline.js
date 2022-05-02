import { Transfer } from "../models/transfer";
import { Parking } from "../models/parking";
import { Flight } from "../models/flight";
import { Accomodation } from "../models/accomodation";
import { Passport } from "../models/passport";
import { Visa } from "../models/visa";

export const Timeline = {
  Index: async (req, res) => {
    const user = req.session.user.userId // ?????
    const transfers = Transfer.findAll({ "user": user }, (err, transfers) => {
      return transfers
    });
    const parking = Parking.findAll({ "user": user }, (err, parking) => {
      return parking
    });
    const flights = Flight.findAll({ "user": user }, (err, flights) => {
      return flights
    });
    const accomodations = Accomodation.findAll({ "user": user }, (err, accomodations) => {
      return accomodations
    });
    const passport = Passport.find({ "user": user }, (err, passport) => {
      return passport
    });
    const visa = Visa.find({ "user": user }, (err, passport) => {
      return visa
    });
    await res.json({
      timeline: { 
        transfers: transfers, 
        parking: parking,
        flights: flights,
        accomodations: accomodations, 
        passport: passport,
        visa: visa
    }});
  },

  Create: (req, res) => {
    const password = req.body.password;
    bcrypt.hash(password, 10).then((hashedPassword) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    user
      .save()
      .then((book) => res.json({ msg: "User added successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to add this user" })
      );
    });
  },

  Profile: (req, res) => {
    const username = req.params.username;
    User.findOne({ username: username }, (err, user) => {
      if (user) {
        res.json({ user: user });
      } else {
        req.session.message = {
          type: "danger",
          message: `The user "${username}" has not been found`,
        };
      }
    });
  }
}
