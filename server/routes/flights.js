const express = require("express");
const FlightController = require("../controllers/flights.js");
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

const flightsRouter = express.Router();
flightsRouter.get("/download/:id", FlightController.Download);
flightsRouter.get("/:id/:tripId", FlightController.Index);
flightsRouter.post("/", FlightController.New);
flightsRouter.post(
  "/upload/:id",
  upload.single("uploaded_file"),
  FlightController.Upload
);
flightsRouter.post("/edit/:id", FlightController.Update);
flightsRouter.post("/delete/:id", FlightController.Delete);

module.exports = flightsRouter;
