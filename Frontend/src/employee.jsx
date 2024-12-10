import React, { useState, useEffect } from "react";
import AxiosInstance from "./Components/AxiosInstance.jsx"; 
import "./Employee.css";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);  // State để kiểm soát form
  const [newEmployee, setNewEmployee] = useState({
    emp_name: "",
    emp_birth_date: "",
    emp_cccd: "",
    emp_address: "",
    emp_phone: "",
    cinemaid: "",  // Thêm cinemaid vào state
  });

  // Hàm tìm kiếm nhân viên theo tên hoặc ID
  const handleSearch = (e) => setSearch(e.target.value);

  // Hàm xoá nhân viên khỏi danh sách và cơ sở dữ liệu
  const handleDelete = (id) => {
    AxiosInstance.delete(`employee/${id}`)
      .then(() => {
        // Sau khi xoá thành công, loại bỏ nhân viên khỏi danh sách
        const filteredEmployees = employees.filter(
          (employee) => employee.emp_id !== id
        );
        setEmployees(filteredEmployees);
      })
      .catch((error) => {
        console.log("Lỗi khi xoá nhân viên: ", error);
      });
  };

  // Hiển thị form thêm nhân viên mới
  const handleAdd = () => {
    setShowForm(true); 
  };

  // Đóng form thêm nhân viên
  const handleCloseForm = () => {
    setShowForm(false);  
  };

  // Cập nhật giá trị các trường trong form khi người dùng thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Lưu nhân viên mới vào cơ sở dữ liệu
  const handleSave = () => {
    AxiosInstance.post("employee/", newEmployee)
      .then((res) => {
        AxiosInstance.get("employee/")
          .then((response) => {
            setEmployees(response.data);  // Cập nhật danh sách nhân viên
            setShowForm(false);  // Đóng form sau khi lưu thành công
          })
          .catch((error) => {
            console.log("Lỗi khi gọi API để lấy danh sách nhân viên: ", error);
          });
      })
      .catch((error) => {
        console.log("Lỗi khi thêm nhân viên: ", error);
      });
  };

  // Lọc danh sách nhân viên theo tên hoặc ID
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.emp_id.toLowerCase().includes(search.toLowerCase())
  );

  // Lấy danh sách nhân viên khi component được tải
  useEffect(() => {
    AxiosInstance.get("employee/")
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

      {/* Tìm kiếm nhân viên */}
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo Tên hoặc ID"
        value={search}
        onChange={handleSearch}
      />

      {/* Nút thêm nhân viên */}
      <button className="add-button" onClick={handleAdd}>
        <i className="fas fa-user-plus"></i> Thêm Nhân Viên
      </button>

      {/* Hiển thị form thêm nhân viên nếu showForm là true */}
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
                <label>ID Rạp:</label> {/* Thêm trường nhập cinemaid */}
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

      {/* Bảng hiển thị danh sách nhân viên */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ngày Sinh</th>
            <th>CCCD</th>
            <th>Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>ID Rạp</th> {/* Thêm cột ID Rạp */}
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
                  onClick={() => handleDelete(employee.emp_id)} // Gọi handleDelete khi nhấn vào nút xoá
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
