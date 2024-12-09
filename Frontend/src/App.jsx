import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./HomePage.jsx";
import Employee from "./employee";
import Cinema from "./Cinema";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Login />} />     
        <Route element={<ProtectedRoute />}>
          <Route path="/HomePage" element={<Home />} />
          <Route path="/Cinema" element={<Cinema />} />
          <Route path="/employee" element={<Employee />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
