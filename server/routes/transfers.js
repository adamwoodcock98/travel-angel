const express = require("express");
const TransferController = require("../controllers/transfers.js");

const TransferRouter = express.Router();
TransferRouter.get("/:id/:tripId", TransferController.Index);
TransferRouter.post("/", TransferController.Create);
TransferRouter.post("/edit/:id", TransferController.Update);
TransferRouter.post("/delete/:id", TransferController.Index);

module.exports = TransferRouter;
