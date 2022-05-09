const express = require("express");
const AccommodationController = require("../controllers/accommodation.js");
const accommodationRouter = express.Router();

accommodationRouter.get("/:id/:tripId", AccommodationController.New);
accommodationRouter.post("/", AccommodationController.Create);
accommodationRouter.post("/edit/:id", AccommodationController.Update);

module.exports = accommodationRouter;
