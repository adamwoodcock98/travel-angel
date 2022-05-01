import { User } from "../models/user.js";

export const signUp = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((book) => res.json({ msg: "User added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this user" }));
};
