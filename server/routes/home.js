import express from "express";
import { Home } from "../controllers/home.js";
const router = express.Router();

router.get("/", Home.Index);

export default router;
