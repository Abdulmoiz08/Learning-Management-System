const express = require("express");
const {updateOldData}= require("../controller/scriptController")
const router = express.Router();

// route to update old student data
router.put("/update-old-data", updateOldData);

module.exports = router;
