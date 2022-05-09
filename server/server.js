const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/user.js");
const flightsRouter = require("./routes/flights.js");
const accommodationRouter = require("./routes/accommodation.js");
const transferRouter = require("./routes/transfers.js");
const parkingRouter = require("./routes/parking.js");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const multer = require("multer");
const Upload = require("./models/upload");

dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(
  session({
    key: "user_sid",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// clear the cookies after user logs out
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

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

app.use(express.static("public"));

const upload = multer({ storage: storage });

app.post("/upload", upload.single("uploaded_file"), async (req, res) => {
  const file = req.file.filename;
  console.log(req.file);
  // console.log(file);
  try {
    const upload = new Upload({ file: file });

    await upload.save();

    res.json({ msg: "Upload Successful", type: "success", file: file });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

app.use("/user", usersRouter);
app.use("/dashboard/flights", flightsRouter);
app.use("/dashboard/accommodation", accommodationRouter);
app.use("/dashboard/transfers", transferRouter);
app.use("/dashboard/parking", parkingRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
