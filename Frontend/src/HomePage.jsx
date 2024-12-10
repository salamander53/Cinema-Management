import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom"; // Import Link từ React Router

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <i className="fas fa-film"></i> Quản Lý Rạp Phim
        </div>
        <nav className="header-nav">
          <a href="/profile">
            <i className="fas fa-user-circle"></i> Thông Tin
          </a>
          <a href="/settings">
            <i className="fas fa-cog"></i> Cài Đặt
          </a>
          <a href="/logout">
            <i className="fas fa-sign-out-alt"></i> Đăng Xuất
          </a>
        </nav>
      </header>

      {/* Nội dung chính */}
      <h1 className="homepage-title">Quản Lý Rạp Phim</h1>
      <div className="flashcards">
        {/* Flashcard Quản Lý Nhân Viên */}
        <Link to="/employee" className="flashcard">
          <div className="icon">
            <i className="fas fa-users"></i>
          </div>
          <p>Quản Lý Nhân Viên</p>
        </Link>

        {/* Flashcard Quản Lý Rạp Phim */}
        <Link to="/cinema" className="flashcard"> {/* Cập nhật link */}
          <div className="icon">
            <i className="fas fa-film"></i>
          </div>
          <p>Quản Lý Rạp Phim</p>
        </Link>
        {/* flashcard quản lý chức vụ */}
        <Link to="/jobmanage" className="flashcard">
          <div className="icon">
            <i className="fas fa-users"></i>
          </div>
          <p>Quản Lý Chức vụ</p>
        </Link>
        <Link to="/SalaryManagement" className="flashcard">
          <div className="icon">
            <i className="fas fa-users"></i>
          </div>
          <p>Lương theo vị trí</p>
        </Link>
        <Link to="/ShiftManage" className="flashcard">
          <div className="icon">
            <i className="fas fa-users"></i>
          </div>
          <p>Quản Lý chấm công</p>
        </Link>
        <Link to="/SalaryPay" className="flashcard">
          <div className="icon">
            <i className="fas fa-users"></i>
          </div>
          <p>Quản Lý chấm công</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
