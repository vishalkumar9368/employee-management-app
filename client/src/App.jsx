import React from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Records from "./pages/records/Records";
import HomePage from "./pages/homepage/HomePage";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_#e8f7ff,_#ffffff,_#f7ebff)] ">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/records" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/records"
          element={isAuthenticated ? <Records /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
