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

const SalaryPay = () => {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [workHoursAggregated, setWorkHoursAggregated] = useState([]); // Lưu trữ dữ liệu tổng số giờ làm việc của nhân viên
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm theo tên hoặc ID nhân viên

  // Fetch dữ liệu từ API
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee")
      .then((res) => {
        console.log(res.data); // Log dữ liệu nhân viên
        setEmployees(res.data);
      })
      .catch(() => toast.error("Không thể tải dữ liệu nhân viên!"));
  
    axios
      .get("http://localhost:3000/currentpostion")
      .then((res) => {
        console.log(res.data); // Log dữ liệu chức vụ
        setPositions(res.data);
      })
      .catch(() => toast.error("Không thể tải dữ liệu chức vụ!"));
  
    axios
      .get("http://localhost:3000/salary1hour")
      .then((res) => {
        console.log(res.data); // Log dữ liệu lương
        setSalaryData(res.data.salaries);
      })
      .catch(() => toast.error("Không thể tải dữ liệu lương!"));
  
    axios
      .get("http://localhost:3000/workhour/aggregated")
      .then((res) => {
        console.log(res.data); // Log dữ liệu tổng số giờ làm việc
        setWorkHoursAggregated(res.data);
      })
      .catch(() => toast.error("Không thể tải dữ liệu tổng số giờ làm việc!"));
  }, []);
  

  // Lấy thông tin chức vụ và loại công việc
  const getPositionAndWorkType = (empId) => {
    const positionData = positions.find((pos) => pos.emp_id === empId);
    if (positionData && positionData.current_positions.length > 0) {
      const currentPosition = positionData.current_positions[0];
      return {
        positionName: currentPosition.position_name,
        workTypeName: currentPosition.workType_name,
      };
    }
    return { positionName: "Không xác định", workTypeName: "Không xác định" };
  };

  // Tìm salary1hour cho nhân viên dựa trên chức vụ và loại công việc
  const getSalary1Hour = (positionName, workTypeName) => {
    const salary = salaryData.find(
      (item) =>
        item.position.position_name === positionName &&
        item.workType.workType_name === workTypeName
    );
    return salary ? (salary.salary1hour === null ? -1 : salary.salary1hour) : -1;
  };

  // Tính tổng lương cho nhân viên
  const calculateTotalSalary = (empId) => {
    const { positionName, workTypeName } = getPositionAndWorkType(empId);
    const salary1hour = getSalary1Hour(positionName, workTypeName);
    const totalWorkHours = calculateTotalWorkHours(empId);
    return salary1hour * totalWorkHours;
  };

  // Xử lý thanh toán lương
  const handlePaySalary = async (empId) => {
    try {
      // Xóa tất cả giờ làm việc của nhân viên này từ workhour
      const employeeWorkHours = workHoursAggregated.filter(
        (work) => work.emp_id === empId
      );

      await Promise.all(
        employeeWorkHours.map((work) =>
          axios.delete(`http://localhost:3000/workhour/${work.log_id}`)
        )
      );

      // Cập nhật lại danh sách giờ làm việc
      setWorkHoursAggregated((prev) =>
        prev.filter((work) => work.emp_id !== empId)
      );

      toast.success("Đã thanh toán lương cho nhân viên!");
    } catch (error) {
      toast.error("Thanh toán thất bại!");
    }
  };

  // Lọc dữ liệu nhân viên theo tên hoặc ID
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.emp_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.emp_id.toString().includes(searchQuery)
  );

  return (
    <Container>
      <h1 className="text-center mb-4">Quản Lý Thanh Toán Lương</h1>

      {/* Thanh tìm kiếm */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc ID nhân viên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "300px",
          }}
        />
      </div>

      <StyledTable>
        <thead>
          <tr>
            <th>Tên Nhân Viên</th>
            <th>ID Nhân Viên</th>
            <th>ID Rạp Phim</th>
            <th>Số Điện Thoại</th>
            <th>Chức Vụ</th>
            <th>Loại Công Việc</th>
            <th>Số Giờ Làm</th>
            <th>Tổng Lương</th>
            <th>Thanh Toán</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees
            .filter(
              (emp) =>
                emp.cinema_id !== null &&
                calculateTotalWorkHours(emp.emp_id) > 0
            )
            .map((emp) => {
              const totalWorkHours = calculateTotalWorkHours(emp.emp_id);
              const { positionName, workTypeName } = getPositionAndWorkType(
                emp.emp_id
              );
              const totalSalary = calculateTotalSalary(emp.emp_id);

              return (
                <tr key={emp.emp_id}>
                  <td>{emp.emp_name}</td>
                  <td>{emp.emp_id}</td>
                  <td>{emp.cinema_id || "Không xác định"}</td>
                  <td>{emp.emp_phone}</td>
                  <td>{positionName}</td>
                  <td>{workTypeName}</td>
                  <td>{totalWorkHours}</td>
                  <td>{totalSalary}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handlePaySalary(emp.emp_id)}
                    >
                      Thanh Toán
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default SalaryPay;
