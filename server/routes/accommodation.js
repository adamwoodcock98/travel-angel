const express = require("express");
const AccommodationController = require("../controllers/accommodation.js");
const accommodationRouter = express.Router();
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

accommodationRouter.get("/download/:id", AccommodationController.Download);
accommodationRouter.get("/:id/:tripId", AccommodationController.New);
accommodationRouter.post("/", AccommodationController.Create);
accommodationRouter.post(
  "/upload/:id",
  upload.single("uploaded_file"),
  AccommodationController.Upload
);

module.exports = accommodationRouter;
