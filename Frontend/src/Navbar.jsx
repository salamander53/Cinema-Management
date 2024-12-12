import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (isConfirmed) {
      // Thực hiện hành động đăng xuất (ví dụ: chuyển hướng hoặc gọi API)
      console.log("Đã đăng xuất!");
      localStorage.removeItem("Token");
      navigate("/"); // Redirect to the login page after logout
    } 
    
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-lg p-2">
      <div className="container-fluid">
        {/* Logo Section with Back Button */}
        <div className="d-flex align-items-center">

          <div className="navbar-brand d-flex align-items-center">
            <span>Hãng Phim Quốc Tế</span>
          </div>
        </div>

        {/* Navigation Links */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <nav className="navbar-nav">
            <Link
              to="/home"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Trang chủ
            </Link>
            <Link
              to="/employee"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Nhân Viên
            </Link>
            <Link
              to="/cinema"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Rạp Phim
            </Link>
            <Link
              to="/jobmanage"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Chức Vụ
            </Link>
            <Link
              to="/SalaryManagement"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Lương
            </Link>
            <Link
              to="/ShiftManage"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Chấm Công
            </Link>
            <Link
              to="/SalaryPay"
              className="nav-link text-white px-3 py-2 rounded hover-effect"
            >
              Trả Lương
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="d-flex align-items-center">
          <button onClick={handleLogout} className="btn btn-danger">
            <i className="fas fa-sign-out-alt"></i> Đăng Xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
