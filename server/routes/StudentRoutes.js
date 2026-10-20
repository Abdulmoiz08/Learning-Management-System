const {addStudent, getStudent, putStudent, deleteStudent , loginStudent , StudentData } = require("../controller/StudentController")
const express = require("express");
const  protect  = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

  
//routes for students
router.post("/login", loginStudent);
router.get("/dashboard", protect, StudentData);


// routes for student records 
router.get("/record", protect, getStudent);
router.post("/signup", protect, upload.single("image"), addStudent);
router.put("/edit", putStudent);
router.delete("/delete/:id", deleteStudent);

module.exports= router;