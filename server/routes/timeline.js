import express from "express";
import { Timeline } from "../controllers/timeline.js";
const router = express.Router();

router.get("/", Timeline.Index);
router.get("/new", Timeline. New);
router.post("/", Timeline.Create);
router.get("/:id/delete", Timeline.Delete);
router.get("/:id/edit", Timeline.Edit);
router.post("/:id/save", Timeline.Save);

export default router;
