import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/user.js";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";

const MongoDBStore = connectMongoDBSession(session);

import dotenv from "dotenv";
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

const mongoDBstore = new MongoDBStore({
  uri: uri,
  collection: "mySessions",
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 60000,
      sameSite: false,
      secure: true,
    },
  })
);

app.use("/user", router);

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
