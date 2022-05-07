const express = require("express");
const VisasController = require("../controllers/visas.js");

const VisaRouter = express.Router();
VisaRouter.get("/", VisasController.Index);
VisaRouter.post("/", VisasController.Create);

module.exports = VisaRouter;