import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance"; 
import { useNavigate } from "react-router-dom";
import "./JobManage.css";
import { toast } from "react-toastify";

const JobManage = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get("/currentpostion")  
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Không thể tải dữ liệu nhân viên!");
      });

    AxiosInstance.get("/salary1hour/positions") 
      .then((res) => {
        setPositions(res.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API lấy chức vụ:", error);
        toast.error("Không thể tải dữ liệu chức vụ!");
      });
  }, []);

  const handleSearch = () => {
    return employees.filter(
      (emp) =>
        emp.emp_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.emp_id.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredEmployees = handleSearch();

  const handleDeletePosition = async (emp) => {
    if (!emp.current_positions.length) {
      toast.warning("Nhân viên này chưa có chức vụ để xóa!");
      return;
    }

    try {
      await AxiosInstance.delete("/currentpostion", { // Sử dụng AxiosInstance để gửi yêu cầu DELETE
        data: {
          emp_id: emp.emp_id,
        },
      });
      toast.success(`Xóa chức vụ thành công cho ${emp.emp_name}!`);

      setEmployees((prev) =>
        prev.map((e) =>
          e.emp_id === emp.emp_id
            ? { ...e, current_positions: [] } // Cập nhật lại dữ liệu nhân viên
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

  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };

  const handleWorkTypeChange = (e) => {
    setSelectedWorkType(e.target.value);
  };

  const handleSavePosition = async () => {
    if (!selectedPosition || !selectedWorkType) {
      toast.warning("Vui lòng chọn chức vụ và loại công việc!");
      return;
    }

    try {
      await AxiosInstance.post("/currentpostion", { // Sử dụng AxiosInstance để gửi yêu cầu POST
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
