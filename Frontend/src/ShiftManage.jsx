import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Container = styled.div`
  margin: 2rem auto;
  max-width: 1200px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;

  th {
    background-color: #007bff;
    color: white;
    padding: 1rem;
    text-align: left;
  }

  td {
    padding: 1rem;
    border: 1px solid #ddd;
  }

  tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const ShiftManage = () => {
  const [workHours, setWorkHours] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [workHourInput, setWorkHourInput] = useState("");

  // Fetch dữ liệu từ API
  useEffect(() => {
    axios
      .get("http://localhost:3000/workhour")
      .then((res) => setWorkHours(res.data.workHours))
      .catch((error) => toast.error("Không thể tải dữ liệu giờ làm việc!"));

    axios
      .get("http://localhost:3000/employee")
      .then((res) => setEmployees(res.data))
      .catch((error) => toast.error("Không thể tải dữ liệu nhân viên!"));
  }, []);

  // Tìm kiếm dữ liệu theo tên nhân viên hoặc ID
  const handleSearch = () => {
    return workHours.filter((work) => {
      const employee = employees.find((emp) => emp.emp_id === work.emp_id);
      return (
        employee &&
        (employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
          work.emp_id.toLowerCase().includes(search.toLowerCase()))
      );
    });
  };

  const filteredWorkHours = handleSearch();

  const handleAddShift = () => setShowForm(true);

  const handleEmployeeChange = (e) => setSelectedEmployee(e.target.value);

  const handleWorkHourChange = (e) => setWorkHourInput(e.target.value);

  const handleSaveShift = async () => {
    if (!selectedEmployee || !workHourInput) {
      toast.warning("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {
      const employee = employees.find((emp) => emp.emp_id === selectedEmployee);
      if (!employee) {
        toast.error("Nhân viên không tồn tại!");
        return;
      }

      const newShift = {
        emp_id: selectedEmployee,
        cinema_id: employee.cinema_id,
        workhour: parseInt(workHourInput),
      };

      await axios.post("http://localhost:3000/workhour", newShift);
      toast.success("Thêm ca thành công!");
      setWorkHours((prev) => [...prev, newShift]);
      setShowForm(false);
      setSelectedEmployee("");
      setWorkHourInput("");
    } catch (error) {
      toast.error("Thêm ca thất bại!");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedEmployee("");
    setWorkHourInput("");
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Quản Lý Ca Làm Việc</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo tên nhân viên hoặc ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <StyledTable>
        <thead>
          <tr>
            <th>Log ID</th>
            <th>Tên Nhân Viên</th>
            <th>ID Nhân Viên</th>
            <th>ID Rạp Phim</th>
            <th>Số Giờ Làm</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkHours.map((work) => {
            const employee = employees.find((emp) => emp.emp_id === work.emp_id);
            return (
              <tr key={work.log_id}>
                <td>{work.log_id}</td>
                <td>{employee ? employee.emp_name : "Không xác định"}</td>
                <td>{work.emp_id}</td>
                <td>{work.cinema_id}</td>
                <td>{work.workhour}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      <button className="btn btn-primary mt-3" onClick={handleAddShift}>
        Thêm Ca
      </button>

      {showForm && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Ca Làm Việc</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelForm}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Chọn Nhân Viên:</label>
                  <select
                    className="form-select"
                    value={selectedEmployee}
                    onChange={handleEmployeeChange}
                  >
                    <option value="">Chọn nhân viên</option>
                    {employees
                      .filter((emp) => emp.cinema_id !== null)
                      .map((emp) => (
                        <option key={emp.emp_id} value={emp.emp_id}>
                          {emp.emp_name} - {emp.emp_id}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Số Giờ Làm Việc:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={workHourInput}
                    onChange={handleWorkHourChange}
                    placeholder="Nhập số giờ làm việc"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveShift}>
                  Lưu
                </button>
                <button className="btn btn-secondary" onClick={handleCancelForm}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShiftManage;
