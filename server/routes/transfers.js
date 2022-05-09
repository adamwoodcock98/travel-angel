const express = require("express");
const TransferController = require("../controllers/transfers.js");

const TransferRouter = express.Router();
TransferRouter.get("/:id/:tripId", TransferController.Index);
TransferRouter.post("/", TransferController.Create);

module.exports = TransferRouter;
