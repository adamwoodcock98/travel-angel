const express = require("express");
const TransferController = require("../controllers/transfers.js");
const multer = require("multer");

const getExtension = (filename) => {
  return filename.split(".").pop();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        getExtension(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const TransferRouter = express.Router();
TransferRouter.get("/download/:id", TransferController.Download);
TransferRouter.get("/:id/:tripId", TransferController.Index);
TransferRouter.post("/", TransferController.Create);
TransferRouter.post(
  "/upload/:id",
  upload.single("uploaded_file"),
  TransferController.Upload
);

module.exports = TransferRouter;
