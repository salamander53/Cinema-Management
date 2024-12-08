import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đăng nhập với", username, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-lightblue">
      <div
        className="card shadow-lg p-5 rounded animate__animated animate__zoomIn"
        style={{
          width: "500px",
          background: "linear-gradient(to bottom, #1976d2, #0d47a1)", // Xanh đậm hơn
          borderRadius: "30px",
        }}
      >
        <h1
          className="text-center text-light fw-bold mb-4 animate__animated animate__fadeInDown"
          style={{ fontSize: "2.5rem" }}
        >
          <i className="bi bi-printer-fill me-2"></i> CinemaManage
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label text-light fw-semibold">
              <i className="bi bi-person-fill"></i> Tên người dùng
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên người dùng"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-light fw-semibold">
              <i className="bi bi-lock-fill"></i> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="d-grid">
            <Link
              to={`dashboard`}
              className="btn btn-primary btn-block animate__animated animate__pulse animate__infinite"
              style={{
                borderRadius: "20px",
                backgroundColor: "#0d47a1",
                border: "none",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-box-arrow-in-right"></i> Đăng nhập
            </Link>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-light">
            <i className="bi bi-question-circle"></i> Quên mật khẩu?{" "}
            <Link to="/reset-password" className="text-warning fw-bold">
              Lấy lại mật khẩu
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
