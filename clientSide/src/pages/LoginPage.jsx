import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const url =
      role === "teacher"
        ? "http://localhost:3001/teacher/login"
        : "http://localhost:3001/student/login";

    axios.post(url, { email, password }).then((res) => {
      localStorage.setItem("token", res.data.token);

      if (role === "teacher") {
        localStorage.setItem("teacherId", res.data.found._id);
        navigate("/Studentlist");
      } else {
        localStorage.setItem("studentId", res.data.found._id);
        navigate("/StudentDashboard");
      }
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white  p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-center mb-8 font-bold text-3xl">Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg px-3 bg-gray-900 py-2 mb-8"
        >
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-8"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-8"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg  mb-8 font-semibold hover:bg-blue-700 transition">
          Login
        </button>

      </form>
    </div>
  );
};

export default LoginPage;
