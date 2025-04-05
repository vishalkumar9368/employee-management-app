import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
Link;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    register(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-8 w-96 border border-gray-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form className="flex flex-col space-y-4 ">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:gray-500 transition-all duration-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:gray-500 transition-all duration-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:gray-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transaition-all duration-300 shadow-md"
          >
            Register
          </button>
          <p className="text-left">
            New user?
            <Link to="/login" className="text-blue-600">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
