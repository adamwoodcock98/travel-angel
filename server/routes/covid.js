const express = require("express");
const CovidController = require("../controllers/covid.js");
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

const covidRouter = express.Router();
covidRouter.get("/download/:id", CovidController.Download);
covidRouter.get("/:id/:tripId", CovidController.Index);
covidRouter.post("/test", CovidController.NewTest);
covidRouter.post("/vaccination/:id/new", CovidController.NewVaccination);
covidRouter.post(
  "/vaccination/:id/edit/:doseId",
  CovidController.UpdateVaccination
);
covidRouter.post(
  "/vaccination/:id/delete/:doseId",
  CovidController.DeleteVaccination
);
covidRouter.post(
  "/upload/:id",
  upload.single("uploaded_file"),
  CovidController.Upload
);
covidRouter.post("/test/edit", CovidController.UpdateTest);
covidRouter.post("/test/delete/:id", CovidController.DeleteTest);

module.exports = covidRouter;
