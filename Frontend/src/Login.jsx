import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "./Components/AxiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AxiosInstance.post(`auth/login/`, {
      username: username,
      password: password,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", res.data);
        navigate(`/home`);
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.error("There was an error logging in: ", error);
        toast.error("Login failed!");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg border-0"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          CinemaManagement
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Tài khoản
            </label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Nhập tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Đăng Nhập
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">
            Quên mật khẩu?
          </a>
          <p className="mt-2">
            Chưa có tài khoản?{" "}
            <a href="#" className="text-decoration-none">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
