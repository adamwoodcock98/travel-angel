const express = require("express");
const TransferController = require("../controllers/transfers.js");

const TransferRouter = express.Router();
TransferRouter.get("/", TransferController.Index);
TransferRouter.post("/", TransferController.Create);

module.exports = TransferRouter;