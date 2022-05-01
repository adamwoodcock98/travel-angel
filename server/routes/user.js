import express from "express";
import { signUp } from "../controllers/user.js";
import { User } from "../models/user.js";

const router = express.Router();
router.get("/", (req, res) => res.send("user route testing!"));
router.post("/", signUp);

export default router;
