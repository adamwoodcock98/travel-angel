const express = require("express");
const CovidController = require("../controllers/covid.js");

const covidRouter = express.Router();
covidRouter.get("/", CovidController.Index);
covidRouter.post("/test", CovidController.NewTest);
covidRouter.post("/vaccination/:id/new", CovidController.NewVaccination);
covidRouter.post("/test/edit", CovidController.UpdateTest);

module.exports = covidRouter;