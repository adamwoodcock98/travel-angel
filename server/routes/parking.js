const express = require("express");
const ParkingController = require("../controllers/parking.js");

const parkingRouter = express.Router();
parkingRouter.get("/", ParkingController.Index);
parkingRouter.post("/", ParkingController.New);

module.exports = parkingRouter;