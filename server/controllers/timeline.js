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

  New: (req, res) => {
    const user = req.session.user
    const info = req.params.info;
    res.json({ user: user, infoType: [info] });
  },

  Create: (req, res) => {
    const user = req.session.user
    const info = req.params.info;
    const content = new [info](req.body);
    
    content.user = user.userId;
    post.save((err) => {
      if (err) {
        throw err;
      }
      req.session.message = {
        type: "success",
        message: "The post has been successfully created!",
      };
      res.json({ user: user, [info]: info });
      res.status(201).redirect("/posts");
    });
  },

  Delete: (req, res) => {
    const info = req.params.info;
    const id = req.params.id;
    [info].deleteOne({ _id: id }, (err) => {
      if (err) {
        throw err;
      }
      req.session.message = {
        type: "success",
        message: `The ${info} has been successfully deleted`,
      };
      res.redirect("..");
    });
  },

  Edit: (req, res) => {
    const info = req.params.info;
    const id = req.params.id;
    [info].find({ _id: id }, (err, info) => {
      if (err) {
        throw err;
      }
      res.json({ [info]: info });
    });
  },

  Save: (req, res) => {
    const info = req.params.info;
    const id = req.params.id;
    const content = req.body;
    [info].updateOne(
      { _id: id },
      { $set: {  } }, // Fields to change!
      () => {
        req.session.message = {
          type: "success",
          message: `The ${info} has been successfully edited!`,
        };
        res.redirect("..");
      }
    )
  }
}
