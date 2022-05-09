const express = require("express");
const ParkingController = require("../controllers/parking.js");

const parkingRouter = express.Router();
parkingRouter.get("/:id/:tripId", ParkingController.Index);
parkingRouter.post("/", ParkingController.New);
parkingRouter.post("/edit/:id", ParkingController.Update);

module.exports = parkingRouter;
