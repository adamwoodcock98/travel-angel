const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/user.js");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const port = process.env.PORT || 8000;

dotenv.config({ path: "./config.env" });

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

const store = MongoStore.create({
  mongoUrl: uri,
  collection: "sessions",
});

app.use(
  session({
    secret: "aaahh",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 60000,
      sameSite: false,
      secure: true,
    },
  })
);

app.use("/user", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
