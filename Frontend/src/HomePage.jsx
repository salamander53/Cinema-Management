import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="container" style={{ paddingTop: "140px" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {/* Flashcard Quản Lý Nhân Viên */}
          <div className="col">
            <Link
              to="/employee"
              className="card text-center shadow-sm h-100 p-4 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            >
              <div className="icon mb-3">
                <i className="fas fa-users fa-3x text-primary"></i>
              </div>
              <p className="card-text font-weight-bold">Quản Lý Nhân Viên</p>
            </Link>
          </div>

          {/* Flashcard Quản Lý Rạp Phim */}
          <div className="col">
            <Link
              to="/cinema"
              className="card text-center shadow-sm h-100 p-4 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            >
              <div className="icon mb-3">
                <i className="fas fa-film fa-3x text-primary"></i>
              </div>
              <p className="card-text font-weight-bold">Quản Lý Rạp Phim</p>
            </Link>
          </div>

          {/* Flashcard Quản Lý Chức Vụ */}
          <div className="col">
            <Link
              to="/jobmanage"
              className="card text-center shadow-sm h-100 p-4 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            >
              <div className="icon mb-3">
                <i className="fas fa-briefcase fa-3x text-primary"></i>
              </div>
              <p className="card-text font-weight-bold">Quản Lý Chức Vụ</p>
            </Link>
          </div>

          {/* Flashcard Quản Lý Lương Theo Vị Trí */}
          <div className="col">
            <Link
              to="/SalaryManagement"
              className="card text-center shadow-sm h-100 p-4 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            >
              <div className="icon mb-3">
                <i className="fas fa-money-bill-wave fa-3x text-primary"></i>
              </div>
              <p className="card-text font-weight-bold">Lương Theo Vị Trí</p>
            </Link>
          </div>

          {/* Flashcard Quản Lý Chấm Công */}
          <div className="col">
            <Link
              to="/ShiftManage"
              className="card text-center shadow-sm h-100 p-4 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            >
              <div className="icon mb-3">
                <i className="fas fa-calendar-check fa-3x text-primary"></i>
              </div>
              <p className="card-text font-weight-bold">Quản Lý Chấm Công</p>
            </Link>
          </div>

          {/* Flashcard Tính Lương */}
          <div className="col">
            <Link
              to="/SalaryPay"
              className="card text-center shadow-sm h-100 p-4 d-flex flex-column align-items-center justify-content-center text-decoration-none"
            >
              <div className="icon mb-3">
                <i className="fas fa-calculator fa-3x text-primary"></i>
              </div>
              <p className="card-text font-weight-bold">Tính Lương</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
