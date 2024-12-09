import React from "react";
import "./HomePage.css";

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
        <div className="flashcard">
          <div className="icon">
            <i className="fas fa-users"></i>
          </div>
          <p>Quản Lý Nhân Viên</p>
        </div>
        <div className="flashcard">
          <div className="icon">
            <i className="fas fa-film"></i>
          </div>
          <p>Quản Lý Chi Nhánh</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
