const express = require("express");
const AccommodationController = require("../controllers/accommodation.js");
const accommodationRouter = express.Router();

accommodationRouter.get("/", AccommodationController.New);
accommodationRouter.post("/", AccommodationController.Create);

module.exports = accommodationRouter;
