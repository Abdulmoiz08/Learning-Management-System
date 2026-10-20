import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className=" bg-gray-900 shadow-md px-6 py-4 flex rounded-b-2xl border-b-2  justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white">
        LMS
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">

        <Link
          to="/Login"
          className=" text-gray-200 hover:text-blue-500"
        >
          Login
        </Link>

        <Link
          to="/Signup"
          className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
