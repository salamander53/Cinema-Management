import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

// Tách biệt logic tìm kiếm ra ngoài render
const filterWorkHours = (workHours, employees, search) => {
  return workHours.filter((work) => {
    const employee = employees.find((emp) => emp.emp_id === work.emp_id);
    return (
      employee &&
      (employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
        work.emp_id.toLowerCase().includes(search.toLowerCase()))
    );
  });
};

// Tách biệt component modal để dễ quản lý
const ShiftFormModal = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
  workHourInput,
  setWorkHourInput,
  handleSaveShift,
  setShowForm,
}) => (
  <div className="modal d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Chấm Công Cho</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowForm(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="employeeSelect" className="form-label">
              Chọn Nhân Viên:
            </label>
            <select
              id="employeeSelect"
              className="form-select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">Chọn nhân viên</option>
              {employees
                .filter((employee) => employee.cinema_id !== null)
                .map((emp) => (
                  <option key={emp.emp_id} value={emp.emp_id}>
                    {emp.emp_name} - {emp.emp_id}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="workHourInput" className="form-label">
              Số Giờ Làm Việc:
            </label>
            <input
              id="workHourInput"
              type="number"
              className="form-control"
              value={workHourInput}
              onChange={(e) => setWorkHourInput(e.target.value)}
              placeholder="Nhập số giờ làm việc"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={handleSaveShift}>
            Lưu
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowForm(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ShiftManage = () => {
  const [workHours, setWorkHours] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [workHourInput, setWorkHourInput] = useState("");

  useEffect(() => {
    AxiosInstance.get("/workhour")
      .then((res) => setWorkHours(res.data.workHours))
      .catch(() => toast.error("Không thể tải dữ liệu giờ làm việc!"));

    AxiosInstance.get("/employee")
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error("Không thể tải dữ liệu nhân viên!"));
  }, []);

  const handleSaveShift = async () => {
    if (!selectedEmployee || !workHourInput) {
      toast.warning("Vui lòng nhập đủ thông tin!");
      return;
    }

    try {
      const employee = employees.find((emp) => emp.emp_id === selectedEmployee);
      const newShift = {
        emp_id: selectedEmployee,
        cinema_id: employee.cinema_id,
        workhour: parseInt(workHourInput),
      };

      await AxiosInstance.post("/workhour", newShift);
      toast.success("Chấm công thành công!");
      setWorkHours((prev) => [...prev, newShift]);

      setSelectedEmployee("");
      setWorkHourInput("");
    } catch {
      toast.error("Chấm công thất bại!");
    }
  };

  const filteredWorkHours = filterWorkHours(workHours, employees, search);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ paddingTop: "100px" }}
    >
      <div className="w-75 rounded bg-white border shadow">
        <Navbar />
        <div className="d-flex justify-content-between align-items-center border-bottom p-2">
          <h2 className="text ">
            <i className="bi bi-hourglass-split mx-2"></i>Lịch Sử Chấm Công
          </h2>
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            <i className="bi bi-clock-history mx-2"></i>
            Chấm Công
          </button>
        </div>
        <div className="p-3">
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Tìm kiếm theo tên nhân viên hoặc ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <table className="table table-hover ">
            <thead className="table">
              <tr>
                <th className="text-center">Tên Nhân Viên</th>
                <th className="text-center">ID Nhân Viên</th>
                <th className="text-center">ID Rạp Phim</th>
                <th className="text-center">Số Giờ Làm</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkHours.map((work) => {
                const employee = employees.find(
                  (emp) => emp.emp_id === work.emp_id
                );
                return (
                  <tr key={work.log_id}>
                    <td className="text-center">
                      {employee ? employee.emp_name : "Không xác định"}
                    </td>
                    <td className="text-center">{work.emp_id}</td>
                    <td className="text-center">{work.cinema_id}</td>
                    <td className="text-center">{work.workhour}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showForm && (
          <ShiftFormModal
            employees={employees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            workHourInput={workHourInput}
            setWorkHourInput={setWorkHourInput}
            handleSaveShift={handleSaveShift}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};

export default ShiftManage;
