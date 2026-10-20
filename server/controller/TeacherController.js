const Teacher = require("../models/Teacher");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(409).json({ message: "Email already exists" });
    }

    Teacher.create({ name, email, password });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const found = await Teacher.findOne({ email });
    if (!found) {
      return res.status(404).json({ message: "User not found" });
    }
    if (found.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res
      .status(200)
      .json({
        message: "Login successful",
        found,
        token: generateToken(found._id),
      });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message});
  }
};
module.exports = { login, signup };
