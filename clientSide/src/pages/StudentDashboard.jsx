import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectSocket, getSocket } from "../lib/socket-io";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setError("");
    axios
      .get("http://localhost:3001/student/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudent(res.data.student);
        console.log(res.data.student);
        if (res.data.student?._id) {
          connectSocket(res.data.student._id);
        }
      })
      .catch((err) => {
        localStorage.clear("token");
        console.log(err.response.data.message);
        console.log(err);
        setError(err.response.data.message || "Please login again");
        navigate("/Login");
      });
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on("studentDeleted", (data) => {
      consoe.log(data);
      debugger;
    });

    return () => {
      socket.off("studentDeleted");
    };
  }, []);

  return (
    <div className=" -mt-19 p-8">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow p-6 min-h-120">
        {error && (
          <div className="mb-4 p-3 rounded bg-red-600 text-white text-center">
            {error}
          </div>
        )}
        {!error && (
          <>
            <div className="flex items-center gap-4">
              <img
                src={
                  student?.image
                    ? `http://localhost:3001/uploads/${student.image}`
                    : "/default.png"
                }
                alt="profile"
                className="w-38 h-38 rounded-full bg-gray-500 text-center text-white   object-cover"
              />

              <div>
                <h2 className="text-4xl font-bold text-white ">
                  {student?.name}
                </h2>
                <p className="text-gray-200 text-2xl">{student?.email}</p>
              </div>
              <div className="self-start">
                <h2 className="font-bold text-white ">
                  Teachername : {student?.teacherId?.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold text-gray-200">rollNo</p>
                <p className="font-semibold text-white">{student?.rollNo}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold text-gray-200">Department</p>
                <p className="font-semibold text-white">
                  {student?.department}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-bold text-gray-200">Semester</p>
                <p className="font-semibold text-white">{student?.semester}</p>
              </div>
            </div>
          </>
        )}

        <button
          onClick={() => {
            localStorage.clear("token");
            navigate("/");
          }}
          className="mt-5 bg-red-500  text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
