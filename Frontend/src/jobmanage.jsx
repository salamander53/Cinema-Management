import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobManage.css"; 
import { toast } from "react-toastify";

const JobManage = () => {
  const [employees, setEmployees] = useState([]); // Dữ liệu nhân viên
  const [search, setSearch] = useState(""); // Ô tìm kiếm
  const [positions, setPositions] = useState([]); // Dữ liệu chức vụ
  const [selectedPosition, setSelectedPosition] = useState(""); // Chức vụ đã chọn
  const [selectedWorkType, setSelectedWorkType] = useState(""); // Loại công việc đã chọn
  const [showForm, setShowForm] = useState(false); // Hiển thị form thêm chức vụ
  const [currentEmployee, setCurrentEmployee] = useState(null); // Nhân viên đang được chọn
  const navigate = useNavigate(); // Điều hướng

  // Gọi API lấy dữ liệu từ backend
  useEffect(() => {
    // Lấy danh sách nhân viên
    axios
      .get("http://localhost:3000/currentpostion")
      .then((res) => {
        setEmployees(res.data); // Cập nhật state với dữ liệu từ API
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Không thể tải dữ liệu nhân viên!"); // Thông báo lỗi
      });

    // Lấy danh sách chức vụ có sẵn
    axios
      .get("http://localhost:3000/salary1hour/positions")
      .then((res) => {
        setPositions(res.data); // Cập nhật state với dữ liệu từ API
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API lấy chức vụ:", error);
        toast.error("Không thể tải dữ liệu chức vụ!");
      });
  }, []);

  // Xử lý tìm kiếm theo tên hoặc ID
  const handleSearch = () => {
    return employees.filter(
      (emp) =>
        emp.emp_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.emp_id.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredEmployees = handleSearch();

  // Hàm xử lý xóa chức vụ
  const handleDeletePosition = async (emp) => {
    if (!emp.current_positions.length) {
      toast.warning("Nhân viên này chưa có chức vụ để xóa!");
      return;
    }

    try {
      // Gửi request DELETE tới API
      await axios.delete("http://localhost:3000/currentpostion", {
        data: {
          emp_id: emp.emp_id,
        },
      });
      toast.success(`Xóa chức vụ thành công cho ${emp.emp_name}!`);

      // Cập nhật danh sách nhân viên sau khi xóa
      setEmployees((prev) =>
        prev.map((e) =>
          e.emp_id === emp.emp_id
            ? { ...e, current_positions: [] } // Xóa chức vụ và loại công việc
            : e
        )
      );
    } catch (error) {
      console.error("Lỗi khi xóa chức vụ:", error);
      toast.error("Xóa chức vụ thất bại!");
    }
  };

  const handleAddPosition = (emp) => {
    if (emp.current_positions.length > 0 && emp.current_positions[0].position_name) {
      toast.warning("Nhân viên đã có chức vụ, không thể thêm mới!");
      return;
    }
    setCurrentEmployee(emp);
    setShowForm(true);
  };

  // Xử lý thay đổi chức vụ
  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  // Xử lý thay đổi loại công việc
  const handleWorkTypeChange = (e) => {
    setSelectedWorkType(e.target.value);
  };
  const handleSavePosition = async () => {
    if (!selectedPosition || !selectedWorkType) {
      toast.warning("Vui lòng chọn chức vụ và loại công việc!");
      return;
    }
  
    try {
      await axios.post("http://localhost:3000/currentpostion", {
        emp_id: currentEmployee.emp_id,
        position_id: selectedPosition,
        workType: selectedWorkType,
      });
  
      toast.success(`Thêm chức vụ thành công cho ${currentEmployee.emp_name}!`);
  
      // Reload lại trang sau khi lưu thành công
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi lưu chức vụ:", error);
      toast.error("Thêm chức vụ thất bại!");
    }
  };

  // Hủy thao tác thêm chức vụ
  const handleCancelForm = () => {
    setShowForm(false); // Đóng form
  };

  return (
    <div className="job-manage-container">
      <h1 className="job-manage-title">Quản Lý Chức Vụ</h1>

      {/* Ô tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Bảng dữ liệu */}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Chức vụ</th>
            <th>Loại công việc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.emp_id}>
              <td>{emp.emp_id}</td>
              <td>{emp.emp_name}</td>
              <td>{emp.emp_phone}</td>
              <td>
                {emp.current_positions.length > 0
                  ? emp.current_positions[0].position_name
                  : "Chưa có"}
              </td>
              <td>
                {emp.current_positions.length > 0
                  ? emp.current_positions[0].workType_name
                  : "Chưa có"}
              </td>
              <td className="td">
                {/* Nút Thêm Chức Vụ */}
                <button
                  className="add-btn"
                  onClick={() => handleAddPosition(emp)}
                >
                  Thêm chức vụ
                </button>
                {/* Nút Xóa Chức Vụ */}
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePosition(emp)}
                >
                  Xóa chức vụ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form thêm chức vụ */}
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h2>Chọn chức vụ cho {currentEmployee?.emp_name}</h2>
            <div className="form-group">
              <label>Chức vụ:</label>
              <select
                value={selectedPosition}
                onChange={handlePositionChange}
                required
              >
                <option value="">Chọn chức vụ</option>
                {positions.map((position) => (
                  <option key={position.position_id} value={position.position_id}>
                    {position.position_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Loại công việc:</label>
              <select
                value={selectedWorkType}
                onChange={handleWorkTypeChange}
                required
              >
                <option value="">Chọn loại công việc</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleSavePosition}>
                Lưu
              </button>
              <button type="button" onClick={handleCancelForm}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManage;
