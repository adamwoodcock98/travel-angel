import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const signUp = (req, res) => {
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
      .then((user) => res.json({ msg: "User added successfully" }))
      .catch((err) => {
        if (err.code === 11000) req.flash("error", "Email already exists");
        if (err.name === "ValidationError")
          req.flash("error", "All fields are required");
        res.status(400).json({ error: "Unable to add this user" });
      });
  });
};

export const logIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          console.log("working");
          req.session.user = user;
          res.json({ user: user });
        } else {
          console.log("not working");
          res.json({ msg: "User not signed in with user found" });
        }
      });
    } else {
      console.log("not working");
      res.json({ msg: "User not signed in" });
    }
  });
};

export const logOut = (req, res) => {
  console.log("logging out");
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
  }
  res.json({ msg: "User logged out successfully" });
};
