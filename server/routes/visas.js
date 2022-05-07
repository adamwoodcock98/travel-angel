const express = require("express");
const VisasController = require("../controllers/visas.js");

const VisaRouter = express.Router();
VisaRouter.get("/", VisasController.Index);
VisaRouter.post("/", VisasController.New);

module.exports = VisaRouter;