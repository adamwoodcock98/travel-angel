import express from "express";
import { UserController } from "../controllers/user.js";
const router = express.Router();

router.get("/signup", UserController.New);
router.post("/", UserController.Create);
router.get("/:id/profile", UserController.Profile);

export default router;
