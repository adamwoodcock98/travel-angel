const validator = require("validator");
const mongoose = require("mongoose");

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
    default: "/images/blank-avatar.jpg",
  },
  accommodation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accommodation",
    },
  ],
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
  parking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
    },
  ],
  transfers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transfer",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
