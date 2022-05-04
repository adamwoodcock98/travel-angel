const express = require("express");
const AccommodationController = require("../controllers/accommodation.js");

const AccommodationRouter = express.Router();
AccommodationRouter.get("/", AccommodationController.Index);
AccommodationRouter.post("/", AccommodationController.New);

module.exports = AccommodationRouter;
