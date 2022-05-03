const User = require("../models/user.js");
const bcrypt = require('bcryptjs');

const UsersController = {
  New: (req, res) => {
    res.json({});
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
    const userId = req.params.id;
    User.findOne({ user: userId }, (err, user) => {
      if (user) {
        res.json({ user: user });
      } else {
        req.session.message = {
          type: "danger",
          message: `The user has not been found`,
        };
      }
    });
  }
}

module.exports = UsersController
