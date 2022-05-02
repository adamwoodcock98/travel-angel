import express from "express";
import { User } from "../controllers/user.js";
const router = express.Router();

router.post("/signup", User.New);
router.post("/", User.Create);
router.get("/:id/profile", User.Profile);

export default router;
