import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./HomePage.jsx";
import Employee from "./employee";
import Cinema from "./Cinema";

import ShiftManage from "./ShiftManage";
import JobManage from "./jobmanage";
import SalaryManagement from "./SalaryManagement";
import SalaryPay from "./SalaryPay";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./Components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/Cinema" element={<Cinema />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/jobmanage" element={<JobManage />} />
          <Route path="/SalaryManagement" element={<SalaryManagement />} />
          <Route path="/ShiftManage" element={<ShiftManage />} />
          <Route path="/SalaryPay" element={<SalaryPay />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
