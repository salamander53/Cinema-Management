import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobManage.css"; 
import { toast } from "react-toastify";
const JobManage = () => {
  const [employees, setEmployees] = useState([]); // Dữ liệu nhân viên
  const [search, setSearch] = useState(""); // Ô tìm kiếm
  const navigate = useNavigate(); // Điều hướng

  // Gọi API lấy dữ liệu từ backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/currentpostion")
      .then((res) => {
        setEmployees(res.data); // Cập nhật state với dữ liệu từ API
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Không thể tải dữ liệu nhân viên!"); // Thông báo lỗi
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
      await axios.delete(`http://localhost:3000/currentpostion`, {
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

  // Điều hướng đến trang thêm chức vụ
  const handleAddJob = (emp) => {
    navigate("/AddJob", { state: { emp_id: emp.emp_id } }); // Truyền dữ liệu qua state
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
          onChange={(e) => setSearch(e.target.value)} //
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
                  onClick={() => handleAddJob(emp)}
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
    </div>
  );
};

export default JobManage;
