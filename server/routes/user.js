const express = require("express");
const UsersController = require("../controllers/user");
const usersRouter = express.Router();

<<<<<<< HEAD
// usersRouter.get("/signup", UsersController.New);
usersRouter.post("/", UsersController.Create);
=======
usersRouter.post("/sign-up", UsersController.SignUp);
usersRouter.post("/log-in", UsersController.LogIn);
usersRouter.post("/log-out", UsersController.LogOut);
>>>>>>> origin

module.exports = usersRouter;
