import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddJob.css"; 
import { toast } from "react-toastify";

const AddJob = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const { emp_id } = location.state || {}; // Lấy emp_id từ state

  const [employee, setEmployee] = useState(null); // Thông tin nhân viên
  const [positionName, setPositionName] = useState("");
  const [workTypeName, setWorkTypeName] = useState(""); 

  // Gọi API lấy thông tin nhân viên theo emp_id
  useEffect(() => {
    if (!emp_id) {
      toast.error("Không tìm thấy ID nhân viên!");
      navigate("/jobmanage");
      return;
    }
  
    axios
      .get(`http://localhost:3000/currentpostion`)
      .then((res) => {
     
        const employeeData = res.data.find((emp) => emp.emp_id === emp_id);
        if (employeeData) {
          setEmployee(employeeData);
        } else {
          toast.error("Không tìm thấy dữ liệu nhân viên!");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin nhân viên:", error);
        toast.error("Lỗi khi kết nối tới server!");
      });
  }, [emp_id, navigate]);

  // Xử lý lưu chức vụ
  const handleSaveJob = async (e) => {
    e.preventDefault();

    if (!positionName || !workTypeName) {
      toast.warning("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {
      // Gửi request POST để thêm chức vụ
      await axios.post("http://localhost:3000/currentpostion", {
        emp_id,
        position_name: positionName,
        workType_name: workTypeName,
      });

      toast.success("Thêm chức vụ thành công!");
      navigate("/jobmanage"); // Quay lại trang jobmanage sau khi lưu
    } catch (error) {
      console.error("Lỗi khi thêm chức vụ:", error);
      toast.error("Không thể thêm chức vụ!");
    }
  };

  return (
    <div className="add-job-container">
      <h1 className="add-job-title">Thêm Chức Vụ Nhân Viên</h1>
      {employee ? (
        <div className="employee-info">
          {/* Icon và thông tin nhân viên */}
          <div className="employee-header">
            <div className="employee-icon">
              <i className="fa fa-user-circle" aria-hidden="true"></i> {/* Icon */}
            </div>
            <div className="employee-details">
              <p><strong>ID:</strong> {employee.emp_id} </p>
              <p><strong>Tên:</strong> {employee.emp_name}</p>
              <p><strong>Số điện thoại:</strong> {employee.emp_phone}</p>
            </div>
          </div>

          {/* Form nhập chức vụ */}
          <form className="job-form" onSubmit={handleSaveJob}>
            <div className="form-group">
              <label htmlFor="positionName">Chức Vụ:</label>
              <input
                type="text"
                id="positionName"
                placeholder="Nhập chức vụ (VD: Manager, Cashier...)"
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="workTypeName">Loại Công Việc:</label>
              <select
                id="workTypeName"
                value={workTypeName}
                onChange={(e) => setWorkTypeName(e.target.value)}
              >
                <option value="">-- Chọn loại công việc --</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Lưu Chức Vụ</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/jobmanage")}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Đang tải thông tin nhân viên...</p>
      )}
    </div>
  );
};

export default AddJob;
