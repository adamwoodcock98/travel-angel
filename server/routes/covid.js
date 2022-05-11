const express = require("express");
const CovidController = require("../controllers/covid.js");

const covidRouter = express.Router();
covidRouter.get("/:id", CovidController.Index);
covidRouter.post("/test", CovidController.NewTest);
covidRouter.post("/vaccination/:id/new", CovidController.NewVaccination);
covidRouter.post(
  "/vaccination/:id/edit/:doseId",
  CovidController.UpdateVaccination
);
covidRouter.post(
  "/vaccination/:id/delete/:doseId",
  CovidController.DeleteVaccination
);
covidRouter.post("/test/edit", CovidController.UpdateTest);
covidRouter.post("/test/delete/:id", CovidController.DeleteTest);

module.exports = covidRouter;
