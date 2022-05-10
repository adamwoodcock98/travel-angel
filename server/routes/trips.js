const express = require("express");
const TripController = require("../controllers/trips.js");

const TripRouter = express.Router();
TripRouter.get("/:id", TripController.Index);
TripRouter.post("/", TripController.Create);

module.exports = TripRouter;
