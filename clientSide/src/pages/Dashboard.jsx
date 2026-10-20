import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [page, setpage] = useState(1);
  const [totalstudent, settotalstudent] = useState(0);
  const [totalpage, settotalpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (studentId) => {
    const token = localStorage.getItem("token");

    await axios
      .delete(`http://localhost:3001/student/delete/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        console.log(res.data.message);
      }).catch((err) => {
        console.log(err.response.data.message);
      });
      // Reload data
      fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3001/student/record/?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data.student);
      console.log(res.data.student);
      settotalpage(res.data.totalpages);
      settotalstudent(res.data.total);
    } catch (err) {
      // 🔴 Backend error handling
      if (err.response) {
        // Backend ne response diya
        setError(err.response.data.message || "Something went wrong");
      } else if (err.request) {
        // Request gayi lekin response nahi aaya
        setError("Server not responding");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlepage = (index) => {
    setpage(index);
  };

  return (
    <div className=" -mt-12.5  p-8">
      <div className="relative max-w-6xl mx-auto bg-gray-900 min-h-140  text-white   rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Registered Students</h2>
          <span className="text-sm text-gray-200">
            Total Students: {totalstudent}
          </span>
          <span className="text-sm text-gray-200">
            <Link to={"/StudentRegister"}>Add Students</Link>
          </span>
          <span className="text-sm text-gray-200">
            <Link
              to={"/"}
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout{" "}
            </Link>
          </span>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
           {!loading && (
          <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900  text-left text-sm font-semibold text-gray-200">
                    <th className="px-4 py-3 border">#</th>
                    <th className="px-4 py-3 border">Photo</th>
                    <th className="px-4 py-3 border">Name</th>
                    <th className="px-4 py-3 border">Email</th>
                    <th className="px-4 py-3 border">Roll No</th>
                    <th className="px-4 py-3 border">Semester</th>
                    <th className="px-4 py-3 border">Department</th>
                    <th className="px-4 py-3 border">buttons</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className="text-sm hover:bg-gray-500 transition"
                    >
                      <td className="px-4 py-3 border">{index + 1}</td>
                      <td className="px-4 py-3 border">
                        <img
                          src={
                            student.image
                              ? `http://localhost:3001/uploads/${student.image}`
                              : "/default.png"
                          }
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover mx-auto"
                        />
                      </td>
                      <td className="px-4 py-3 border font-medium">
                        {student.name}
                      </td>
                      <td className="px-4 py-3 border">{student.email}</td>
                      <td className="px-4 py-3 border">{student.rollNo}</td>
                      <td className="px-4 py-3 border text-center">
                        {student.semester}
                      </td>
                      <td className="px-4 py-3 border">{student.department}</td>
                      <td className="px-4 py-3 border">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
          </table>
          )}
           {/* No Students Message */}
            {students.length === 0 && !error && (
              <div className="text-center py-6 text-gray-300">
                <p
                  colSpan="8"
                  className="text-center  py-6 font-bold text-gray-200"
                >
                  No students registered yet
                </p>
              </div >
            )}
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded bg-red-600 text-white text-center">
                {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-6 text-gray-300">
                Loading students...
              </div>
            )}
          <div className="absolute bottom-5 left-[46%]  justify-center mt-[25%] gap-2">
            <button
              onClick={() => handlepage(page - 1)}
              disabled={page === 1}
              className="px-3 py-2 rounded-md border 
               text-gray-700 bg-white 
               hover:bg-gray-100 
               disabled:opacity-50 
               disabled:cursor-not-allowed"
            >
              ◀
            </button>

            {[...Array(totalpage)].map((a, index) => {
              const pageNumber = index + 1;
              const isActive = page === pageNumber;

              return (
                <button
                  key={index}
                  onClick={() => handlepage(pageNumber)}
                  className={`px-4 py-2 rounded-md border 
          ${
            isActive
              ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-700"
              : "bg-white text-gray-700 hover:bg-gray-300"
          }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => handlepage(page + 1)}
              disabled={page === totalpage}
              className="px-3 py-2 rounded-md border 
               text-gray-700 bg-white 
               hover:bg-gray-100 
               disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
