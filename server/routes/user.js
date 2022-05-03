const express = require("express");
const UsersController = require("../controllers/user");
const usersRouter = express.Router();

usersRouter.post("/", UsersController.SignUp);
usersRouter.post("/sign-in", UsersController.SignIn);
usersRouter.post("/sign-out", UsersController.SignOut);

module.exports = usersRouter;
