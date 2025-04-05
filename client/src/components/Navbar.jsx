import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  // state to open close menu
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* logo */}
        <Link
          to="/"
          className="text-2xl bg-clip-text text-transparent font-Bold bg-gradient-to-r from-blue-700 to-purple-700"
        >
          WorkFlowX
        </Link>
        {/* Hamburger Icon hidden on md screen */}
        <button
          className="text-2xl md:hidden"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* desktop nav links */}
        <ul className="hidden md:flex space-x-6">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/records">Records</Link>
              </li>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {/* mobile nav links only visible when menuOpen true */}
        {menuOpen && (
          <ul className="md:hidden bg-white absolute right-0 top-14 shadow-lg rounded-lg px-10 py-4 z-10">
            {isAuthenticated ? (
              <>
                <li className="p-2" onClick={() => setMenuOpen(false)}>
                  <Link to="/records">Records</Link>
                </li>
                <li className="p-2" onClick={() => setMenuOpen(false)}>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="p-2" onClick={() => setMenuOpen(false)}>
                  <Link to="/login">Login</Link>
                </li>
                <li className="p-2" onClick={() => setMenuOpen(false)}>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
