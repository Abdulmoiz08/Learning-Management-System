const express = require("express");
const {forEmailVerification,forPasswordverification} = require("../middleware/validator");
const {login,signup} = require("../controller/TeacherController");
const router = express.Router();



router.post("/signup", forEmailVerification, forPasswordverification, signup);
router.post("/login", forEmailVerification, forPasswordverification, login);

module.exports = router;