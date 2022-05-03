import express from "express";
import { logOut, signUp } from "../controllers/user.js";
import { logIn } from "../controllers/user.js";

const router = express.Router();
router.get("/", (req, res) => res.send("user route testing!"));
router.post("/", signUp);
router.post("/log-in", logIn);
router.post("/log-out", logOut);

export default router;
