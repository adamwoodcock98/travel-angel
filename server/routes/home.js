import express from "express";
import { Home } from "../controllers/home.js";
const router = express.Router();

router.get("/", Home.Index);
router.get("/timeline", Home.Timeline);

export default router;
