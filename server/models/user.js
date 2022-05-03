import mongoose from "mongoose";
import { transfersSchema } from "./transfers.js";
import { parkingSchema } from "./parking.js";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profilePicture: {
    type: String,
  },
  transfers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transfer",
    },
  ],
  parking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
    },
  ],
  accommodation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],
  visas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visa",
    },
  ],
  covidDocumentation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CovidDocumentation",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
