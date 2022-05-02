import express from "express";
import { Timeline } from "../controllers/timeline.js";
const router = express.Router();

router.get("/", Timeline.Index);
router.get(":info/new", Timeline. New);
router.post("/", Timeline.Create);
router.get(":info/:id/delete", Timeline.Delete);
router.get(":info/:id/edit", Timeline.Edit);
router.post(":info/:id/save", Timeline.Save);

export default router;
