const express = require("express");
const UsersController = require("../controllers/user");
const usersRouter = express.Router();

usersRouter.post("/sign-up", UsersController.SignUp);
usersRouter.post("/log-in", UsersController.LogIn);
usersRouter.post("/log-out", UsersController.LogOut);
usersRouter.get("/:id/profile", UsersController.Profile);
usersRouter.get("/:id/settings", UsersController.Settings);
usersRouter.post("/:id/save", UsersController.Save);


module.exports = usersRouter;
