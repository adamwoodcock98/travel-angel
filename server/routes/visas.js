const express = require("express");
const VisaController = require("../controllers/visas.js");

const VisaRouter = express.Router();
VisaRouter.get("/:id/:tripId", VisaController.Index);
VisaRouter.post("/", VisaController.Create);

module.exports = VisaRouter;
