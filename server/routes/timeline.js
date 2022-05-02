const express = require("express");
const TimelineController = require("../controllers/timeline");
const router = express.Router();

router.get("/", TimelineController.Index);
router.get(":info/new", TimelineController. New);
router.post("/", TimelineController.Create);
router.get(":info/:id/delete", TimelineController.Delete);
router.get(":info/:id/edit", TimelineController.Edit);
router.post(":info/:id/save", TimelineController.Save);

module.exports = TimelineController;