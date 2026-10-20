const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users");
    console.log("MongoDB Atlas Connected ");
  } catch (error) {
    console.error("MongoDB connection failed ");
  }
};

module.exports = connectDB;
