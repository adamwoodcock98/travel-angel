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
        .then((user) =>
          res.json({ msg: "User added successfully", type: "success" })
        )
        .catch((err) =>
          res.status(400).json({ error: "Unable to sign up", type: "error" })
        );
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
            res.json({
              msg: `Welcome back, ${user.firstName}!`,
              type: "success",
              user: user._id,
            });
          } else {
            res.json({ msg: "Incorrect details entered!", type: "error" });
          }
        });
      } else {
        res.json({
          msg: "User not found. Please sign up first!",
          type: "warning",
        });
      }
    });
  },

  LogOut: (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      req.session.destroy();
    }
    res.json({ msg: "You have logged out successfully!", type: "success" });
  },

  Profile: (req, res) => {
    const userId = req.params.id;
    User.findById(userId).then((user) => {
      res.json({
        user: user,
      });
    });
  },

  Settings: (req, res) => {
    const userId = req.params.id;
    User.findOne({ _id: userId }).then((user) => {
      res.json({
        user: user,
      });
    });
  },

  Save: async (req, res) => {
    const userId = req.params.id;
    const userDetails = req.body;
    // const password = req.body.password;
    // const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          // password: hashedPassword,
          profilePicture: userDetails.profilePicture,
        },
      },
      {
        new: true,
      }
    );
    await res.json({
      msg: "Congrats! You've updated your details!",
      type: "success",
      user: "user",
    });
  },
};

module.exports = UsersController;
