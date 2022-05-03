const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const UsersController = {
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
};

module.exports = UsersController;
