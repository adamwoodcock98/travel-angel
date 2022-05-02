import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const User = {
  New: (req, res) => {
    res.render("users/signup", {});
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
        res.render("users/profile", { user: user });
      } else {
        req.session.message = {
          type: "danger",
          message: `The user "${username}" has not been found`,
        };
      }
    });
  }
}
