const express = require("express");
const UsersController = require("../controllers/user");
const router = express.Router();

router.get("/signup", UsersController.New);
router.post("/", UsersController.Create);
router.get("/:id/profile", UsersController.Profile);

module.exports = router;
