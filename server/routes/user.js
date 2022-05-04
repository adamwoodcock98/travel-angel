const express = require("express");
const UsersController = require("../controllers/user");
const usersRouter = express.Router();

usersRouter.get("/signup", UsersController.New);
usersRouter.post("/", UsersController.Create);

module.exports = usersRouter;
