import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 via-slate-800 to-gray-900 ">
      <Navbar />
      <div className="mt-[5%]">
      <Outlet/>
      </div>
    
    </div>
  );
}
