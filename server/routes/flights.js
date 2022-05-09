const express = require("express");
const FlightController = require("../controllers/flights.js");

const flightsRouter = express.Router();
flightsRouter.get("/:id/:tripId", FlightController.Index);
flightsRouter.post("/", FlightController.New);

module.exports = flightsRouter;
