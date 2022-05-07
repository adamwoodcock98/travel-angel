const express = require("express");
const CovidController = require("../controllers/covid.js");

const covidRouter = express.Router();
covidRouter.get("/", CovidController.Index);
covidRouter.post("/test", CovidController.NewTest);
covidRouter.post("/vaccination", CovidController.NewVaccination);

module.exports = covidRouter;