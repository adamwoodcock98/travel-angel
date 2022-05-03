const express = require("express");
const UsersController = require("../controllers/user");
const router = express.Router();

router.get("/signup", UsersController.New);
router.post("/", UsersController.Create);

module.exports = router;
