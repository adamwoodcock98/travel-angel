const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const UsersController = {
  SignUp: (req, res) => {
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
        .catch((err) => res.status(400).json({ error: "Unable to sign up" }));
    }); 
  },

  LogIn: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            req.session.user = user;
            res.json({ user: user });
          } else {
            res.json({ msg: "Incorrect details entered" });
          }
        });
      } else {
        res.json({ msg: "User not found" });
      }
    });
  },

  LogOut: (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      req.session.destroy();
    }
    res.json({ msg: "User signed out successfully" });
  },
};

module.exports = UsersController;
