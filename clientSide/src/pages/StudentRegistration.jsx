import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentRegister() {

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
    semester: "",
    department: "",
    image: null, // ✅ image
  });

  // ✅ handle text + file both
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setStudentData({
      ...studentData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // ✅ FormData for image upload
    const formData = new FormData();
    Object.entries(studentData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // formData.append("name", studentData.name);
    // formData.append("email", studentData.email);
    // formData.append("password", studentData.password);
    // formData.append("rollNo", studentData.rollNo);
    // formData.append("semester", studentData.semester);
    // formData.append("department", studentData.department);
    // formData.append("image", studentData.image); 

    const res = await axios.post(
      "http://localhost:3001/student/signup",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("login", res.data.message);

    setStudentData({
      name: "",
      email: "",
      password: "",
      rollNo: "",
      semester: "",
      department: "",
      image: null,
    });
  };

  return (
    <div className=" flex items-center justify-center -mt-10 ">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white p-4 rounded-xl shadow-lg w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Student Registration
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={studentData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={studentData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mb-4 "
          required
        />

        {/* Roll No */}
        <input
          type="text"
          name="rollNo"
          value={studentData.rollNo}
          onChange={handleChange}
          placeholder="Roll No"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />

        {/* Semester */}
        <input
          type="number"
          name="semester"
          value={studentData.semester}
          onChange={handleChange}
          placeholder="Semester"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          required
        />

        {/* Department */}
        <select
          name="department"
          value={studentData.department}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mb-6"
          required
        >
          <option value="">Select Department</option>
          <option value="bscs">BSCS</option>
          <option value="bsse">BSSE</option>
          <option value="bsit">BSIT</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg mb-3"
        >
          Register Student
        </button>

        <Link
          to={"/Studentlist"}
          className="block text-center bg-indigo-600 text-white p-2 rounded-lg"
        >
          Registered Students
        </Link>
      </form>
    </div>
  );
}
