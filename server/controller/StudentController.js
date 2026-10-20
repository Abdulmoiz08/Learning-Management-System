const Student = require("../models/Student");
const { userMap, getIO } = require("../socket-io");
const generateToken = require("../utils/generateToken");

// controller functions for student records

const addStudent = async (req, res) => {
  try {
    const { name, email, rollNo, semester, department, password } = req.body;
    const teacherId = req.decodedId.id; // when teacher add student it gets teacher id from token

    // 🔥 multer image
    const image = req.file ? req.file.filename : null;

    const newStudent = await Student.create({
      name,
      email,
      password,
      rollNo,
      semester,
      department,
      teacherId,
      image, // save image name
    });

    res.status(201).json({
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding student",
      error: error.message,
    });
  }
};

const getStudent = async (req, res) => {
  try {
    const id = req.decodedId.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    console.log(id);
    const total = await Student.countDocuments({ teacherId: id });
    console.log("Total students:", total);
    const totalpages = Math.ceil(total / limit);
    const student = await Student.find({ teacherId: id, isDeleted: false })
      .skip(skip)
      .limit(limit);
    console.log("Fetched students:", student);

    if (student.length === 0) {
      return res.status(404).json({ message: "No Student found" });
    }
    res.status(200).json({
      totalpages,
      student,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

const putStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rollNo, semester, department, teacherId } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, rollNo, semester, department, teacherId },
      { new: true },
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Studentnot found" });
    }
    res.status(200).json({
      message: "Student updated successfully",
      Student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating Student", error });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    const socketId = userMap[id];
    const io = getIO();

    console.log(userMap, socketId);
    if (socketId) {
      io.to(socketId).emit("studentDeleted", {
        message: "Your account has been deleted",
      });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting Student", error });
  }
};

// controller for student login and dashboard

const loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await Student.findOne({ email, password });
    if (!found) {
      return res.status(404).json({ message: "User not found" });
    }
    if (found.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({
      message: "Login successful",
      found,
      token: generateToken(found._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const StudentData = async (req, res) => {
  try {
    const id = req.decodedId.id;
    const student = await Student.findById(id, { isDeleted: false })
      .select("-password")
      .populate("teacherId", "name");
    if (!student) {
      return res.status(404).json({ message: "No Student found" });
    }
    res.status(200).json({
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

module.exports = {
  StudentData,
  loginStudent,
  addStudent,
  getStudent,
  putStudent,
  deleteStudent,
};
