const express = require("express");
const VisaController = require("../controllers/visas.js");
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

const VisaRouter = express.Router();
VisaRouter.get("/download/:id", VisaController.Download);
VisaRouter.get("/:id/:tripId", VisaController.Index);
VisaRouter.post("/", VisaController.Create);
VisaRouter.post(
  "/upload/:id",
  upload.single("uploaded_file"),
  VisaController.Upload
);
VisaRouter.post("/edit/:id", VisaController.Update);
VisaRouter.post("/delete/:id", VisaController.Delete);

module.exports = VisaRouter;
