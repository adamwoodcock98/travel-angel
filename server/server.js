const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/user.js");
const flightsRouter = require("./routes/flights.js")
const accommodationRouter = require("./routes/accommodation.js")
const transferRouter = require("./routes/transfers.js")
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 8000;

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

app.use("/user", usersRouter);
app.use("/dashboard/flights", flightsRouter);
app.use("/dashboard/accommodation", accommodationRouter);
app.use("/dashboard/transfers", transferRouter)

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
