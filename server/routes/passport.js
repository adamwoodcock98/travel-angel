const express = require("express");
const PassportController = require("../controllers/passport.js");

const passportRouter = express.Router();
passportRouter.get("/", PassportController.Index);
passportRouter.post("/", PassportController.New);

module.exports = passportRouter;