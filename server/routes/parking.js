const express = require("express");
const ParkingController = require("../controllers/parking.js");
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

const parkingRouter = express.Router();
parkingRouter.get("/download/:id", ParkingController.Download);
parkingRouter.get("/:id/:tripId", ParkingController.Index);
parkingRouter.post("/", ParkingController.New);
parkingRouter.post(
  "/upload/:id",
  upload.single("uploaded_file"),
  ParkingController.Upload
);

module.exports = parkingRouter;
