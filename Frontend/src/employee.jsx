import React, { useState, useEffect } from "react";
import AxiosInstance from "./Components/AxiosInstance.jsx"; 
import "./Employee.css";
import { Link } from "react-router-dom";

const Employee = () => {
  // State cho danh sách nhân viên và ô tìm kiếm
  const [employees, setEmployees] = useState([]); // Ban đầu để mảng rỗng
  const [search, setSearch] = useState("");

  // Hàm tìm kiếm nhân viên
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Hàm xóa nhân viên
  const handleDelete = (id) => {
    const filteredEmployees = employees.filter(
      (employee) => employee.emp_id !== id
    );
    setEmployees(filteredEmployees);
  };

  // Hàm thêm nhân viên (mock)
  const handleAdd = () => {
    const newEmployee = {
      emp_id: `EMP00${employees.length + 1}`,
      emp_name: "New Employee",
      emp_birth_date: "2000-01-01",
      emp_cccd: 12345678,
      emp_address: "New Address",
      emp_phone: "0000000000",
    };
    setEmployees([...employees, newEmployee]);
  };

  // Lọc danh sách nhân viên theo tên hoặc ID
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.emp_id.toLowerCase().includes(search.toLowerCase())
  );

  // Gọi API để lấy danh sách nhân viên khi component được render lần đầu
  useEffect(() => {
    AxiosInstance.get("employee/")
      .then((res) => {
        console.log(res) ;
        setEmployees(res.data); 
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: ", error);
      });
  }, []);

  return (
    <div className="employee-container">
      {/* Tiêu đề */}
      <h1 className="employee-title">
        <i className="fas fa-users"></i> Quản Lý Nhân Viên
      </h1>

      {/* Tìm kiếm nhân viên */}
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo Tên hoặc ID"
        value={search}
        onChange={handleSearch}
      />

      {/* Nút Thêm Nhân Viên */}
      <button className="add-button" onClick={handleAdd}>
        <i className="fas fa-user-plus"></i> Thêm Nhân Viên
      </button>

      {/* Bảng thông tin nhân viên */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ngày Sinh</th>
            <th>CCCD</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.emp_name}</td>
              <td>{employee.emp_birth_date}</td>
              <td>{employee.emp_cccd}</td>
              <td>{employee.emp_address}</td>
              <td>{employee.emp_phone}</td>
              <td>
                {/* Link tới trang Detail */}
                <Link
                  to={`/detail/${employee.emp_id}`}
                  className="detail-button"
                  title="Xem Chi Tiết"
                >
                  <i className="fas fa-info-circle"></i> Chi Tiết
                </Link>
                {/* Nút Xóa */}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(employee.emp_id)}
                  title="Xóa"
                >
                  <i className="fas fa-trash-alt"></i> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
