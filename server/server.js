const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const homeRouter = require("./routes/home.js");
const usersRouter = require("./routes/user.js");
const timelineRouter = require("./routes/timeline.js");
const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use("/", homeRouter);
app.use("/timeline", timelineRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
