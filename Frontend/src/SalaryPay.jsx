import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance";

const SalaryPay = () => {
  const [workHours, setWorkHours] = useState([]); 
  const [employeePositions, setEmployeePositions] = useState([]); 
  const [salaryData, setSalaryData] = useState([]); 
  const [mergedData, setMergedData] = useState([]); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      try {

        const workHoursRes = await AxiosInstance.get("/workhour/aggregated");
        const workHoursData = workHoursRes.data.data;
        const positionsRes = await AxiosInstance.get("/currentpostion");
        const positionsData = positionsRes.data;
        const salaryRes = await AxiosInstance.get("/salary1hour");
        const salaryData = salaryRes.data.salaries;
        const merged = workHoursData.map((workItem) => {
          const employee = positionsData.find((emp) => emp.emp_id === workItem.emp_id);
          if (employee) {
            const { position_name, workType_name } = employee.current_positions[0];

            const salaryItem = salaryData.find(
              (salary) =>
                salary.position.position_name === position_name &&
                salary.workType.workType_name === workType_name
            );

            const totalSalary = salaryItem ? salaryItem.salary1hour * workItem.total_workhour : 0;

            return {
              ...workItem,
              position_name,
              workType_name,
              salary1hour: salaryItem ? salaryItem.salary1hour : 0,
              totalSalary,
            };
          }
          return workItem;
        });

        setWorkHours(workHoursData);
        setEmployeePositions(positionsData);
        setSalaryData(salaryData);
        setMergedData(merged); // Set the merged data with calculated salary
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        alert("Không thể tải dữ liệu. Vui lòng thử lại.");
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchData();
  }, []);

  const handlePayment = async (emp_id, cinema_id) => {
    try {
      const response = await AxiosInstance.delete(`/workhour`, {
        data: {
         "emp_id": emp_id,
         "cinema_id": cinema_id
        }
      });
      console.log("Xóa ca làm việc thành công", response.data);
      setMergedData(prevData => prevData.filter(item => !(item.emp_id === emp_id && item.cinema_id === cinema_id)));
  
      alert("Thanh toán thành công và ca làm việc đã được xóa!");
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#2c3e50", textAlign: "center" }}>Bảng Tính Lương</h1>

      {loading ? (
        <div style={{ textAlign: "center", fontSize: "18px" }}>Đang tải dữ liệu...</div>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Mã nhân viên
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Mã rạp
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Tổng số giờ làm
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Vị trí công việc
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Loại công việc
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Lương một giờ
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Lương
                </th>
                <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {mergedData.length > 0 ? (
                mergedData.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.emp_id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.cinema_id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.total_workhour}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.position_name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.workType_name}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.salary1hour ? item.salary1hour : "Chưa có dữ liệu"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.totalSalary ? item.totalSalary : "Chưa có dữ liệu"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "none",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() =>
                          handlePayment(item.emp_id, item.cinema_id) // Pass the log_id for deletion
                        }
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Thanh toán
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    Không có dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SalaryPay;
