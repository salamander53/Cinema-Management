import React, { useState, useEffect } from "react";
import AxiosInstance from "./Components/AxiosInstance.jsx";  // Importing AxiosInstance
import "./Employee.css";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    emp_name: "",
    emp_birth_date: "",
    emp_cccd: "",
    emp_address: "",
    emp_phone: "",
    cinemaid: "", // Added cinemaid to state
  });
   // updategit
   
  const handleSearch = (e) => setSearch(e.target.value);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      AxiosInstance.delete(`employee/${id}`)
        .then(() => {
          const filteredEmployees = employees.filter(
            (employee) => employee.emp_id !== id
          );
          setEmployees(filteredEmployees);
        })
        .catch((error) => {
          console.log("Lỗi khi xoá nhân viên: ", error);
        });
    }
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSave = () => {
    AxiosInstance.post("employee/", newEmployee)
      .then((res) => {
        AxiosInstance.get("employee/") // Fetch employees after adding a new one
          .then((response) => {
            setEmployees(response.data); // Update employee list
            setShowForm(false); // Close the form
          })
          .catch((error) => {
            console.log("Lỗi khi gọi API để lấy danh sách nhân viên: ", error);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi thêm nhân viên: ", error);
      });
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.emp_id.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    AxiosInstance.get("employee/") // Use AxiosInstance to fetch data
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.log("Lỗi khi gọi API: ", error);
      });
  }, []);

  return (
    <div className="employee-container">
      <h1 className="employee-title">
        <i className="fas fa-users"></i> Quản Lý Nhân Viên
      </h1>

      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo Tên hoặc ID"
        value={search}
        onChange={handleSearch}
      />

      <button className="add-button" onClick={handleAdd}>
        <i className="fas fa-user-plus"></i> Thêm Nhân Viên
      </button>

      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h2>Thêm Nhân Viên Mới</h2>
            <form>
              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  name="emp_name"
                  value={newEmployee.emp_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ngày Sinh:</label>
                <input
                  type="date"
                  name="emp_birth_date"
                  value={newEmployee.emp_birth_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>CCCD:</label>
                <input
                  type="text"
                  name="emp_cccd"
                  value={newEmployee.emp_cccd}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Địa Chỉ:</label>
                <input
                  type="text"
                  name="emp_address"
                  value={newEmployee.emp_address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Số Điện Thoại:</label>
                <input
                  type="text"
                  name="emp_phone"
                  value={newEmployee.emp_phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ID Rạp:</label>
                <input
                  type="text"
                  name="cinemaid"
                  value={newEmployee.cinemaid}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="save-button" onClick={handleSave}>
                  Lưu
                </button>
                <button type="button" className="cancel-button" onClick={handleCloseForm}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ngày Sinh</th>
            <th>CCCD</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>ID Rạp</th>
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
              <td>{employee.cinemaid}</td>
              <td>
                <Link
                  to={`/detail/${employee.emp_id}`}
                  className="detail-button"
                  title="Xem Chi Tiết"
                >
                  <i className="fas fa-info-circle"></i> Chi Tiết
                </Link>
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
