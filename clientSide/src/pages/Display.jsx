import React from 'react'
import { Link, } from "react-router-dom";

const Display = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          Learning Management System
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-8">
          Manage students, courses, and learning in one powerful platform.
          Built for teachers and students.
        </p>

        <div className="flex gap-4">
          <Link
            to="/Login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/Signup"
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Create Account
          </Link>
        </div>
      </section>
  )
}

export default Display