const express = require("express");
const VisaController = require("../controllers/visas.js");

const VisaRouter = express.Router();
VisaRouter.get("/", VisaController.Index);
VisaRouter.post("/", VisaController.Create);

module.exports = VisaRouter;