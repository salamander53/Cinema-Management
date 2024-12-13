import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance";
import Navbar from "./Navbar";

const SalaryPay = () => {
  const [totalWorkHour, setTotalWorkHour] = useState([]);
  const [currentPosition, setCurrentPosition] = useState([]);
  const [positions, setPositions] = useState([]);
  const [worktype, setWorkType] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeRes = await AxiosInstance.get("employee/");
        setEmployee(employeeRes.data);

        const workHourRes = await AxiosInstance.get("workhour/aggregated/");
        setTotalWorkHour(workHourRes.data.data);

        const positionRes = await AxiosInstance.get("salary1hour/positions/");
        setPositions(positionRes.data);

        const workTypeRes = await AxiosInstance.get("salary1hour/worktypes/");
        setWorkType(workTypeRes.data);

        const currentPosRes = await AxiosInstance.get("currentpostion/");
        setCurrentPosition(currentPosRes.data);

        const salaryRes = await AxiosInstance.get("salary1hour/");
        setSalaryData(salaryRes.data.salaries);

        const cinemaRes = await AxiosInstance.get("cinema/");
        setCinema(cinemaRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = (emp_id, cinema_id, total_workhour) => {
    const currentPositionFound = currentPosition.find(
      (emp) => emp.emp_id === emp_id
    )?.current_positions[0];

    if (!currentPositionFound) return null;

    const salary1hour = salaryData.find(
      (salary) =>
        salary.position.position_name === currentPositionFound.position_name &&
        salary.workType.workType_name === currentPositionFound.workType_name
    )?.salary1hour;

    return {
      emp_name:
        employee.find((emp) => emp.emp_id === emp_id)?.emp_name || "N/A",
      cinema_name:
        cinema.find((cin) => cin.cinema_id === cinema_id)?.cinema_name || "N/A",
      position_name: currentPositionFound.position_name || "N/A",
      workType_name: currentPositionFound.workType_name || "N/A",
      salary1hour: salary1hour || 0,
      total_workhour: total_workhour || 0,
      salary: salary1hour ? salary1hour * total_workhour : 0,
    };
  };

  const handlePayment = async (emp_id, cinema_id) => {
    try {
      await AxiosInstance.delete(`/workhour`, {
        data: { emp_id: emp_id, cinema_id: cinema_id },
      });
      setTotalWorkHour((prev) =>
        prev.filter(
          (item) => !(item.emp_id === emp_id && item.cinema_id === cinema_id)
        )
      );
      alert("Thanh toán thành công!");
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };

  const filteredData = totalWorkHour.filter((item) => {
    const rowData = data(item.emp_id, item.cinema_id, item.total_workhour);
    if (!rowData) return false;
    return (
      rowData.emp_name.toLowerCase().includes(search.toLowerCase()) ||
      rowData.cinema_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container " style={{ paddingTop: "100px" }}>
      <Navbar />
      <div
        className="d-flex flex-column align-items-center justify-content-center "
        style={{ paddingTop: 20 }}
      >
        <div className="w-100 rounded bg-white border shadow">
          <h1 className="text text mb-1 pt-3 ">
            {" "}
            <i class="bi bi-cash mx-2"></i>Bảng Tính Lương
          </h1>

          <div className="p-3">
            <input
              type="text"
              className="form-control "
              placeholder="Tìm kiếm theo tên nhân viên hoặc tên rạp phim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <div class="spinner-border text-primary m-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive ">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Tên nhân viên</th>
                    <th>Tên rạp phim</th>
                    <th>Tên công việc</th>
                    <th>Kiểu công việc</th>
                    <th>Lương 1 giờ</th>
                    <th>Tổng số giờ làm</th>
                    <th>Lương</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => {
                      const rowData = data(
                        item.emp_id,
                        item.cinema_id,
                        item.total_workhour
                      );

                      if (!rowData) return null;

                      return (
                        <tr key={index}>
                          <td className="text-center">{rowData.emp_name}</td>
                          <td className="text-center">{rowData.cinema_name}</td>
                          <td className="text-center">
                            {rowData.position_name}
                          </td>
                          <td className="text-center">
                            {rowData.workType_name}
                          </td>
                          <td className="text-center">{rowData.salary1hour}</td>
                          <td className="text-center">
                            {rowData.total_workhour}
                          </td>
                          <td className="text-center">{rowData.salary}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() =>
                                handlePayment(item.emp_id, item.cinema_id)
                              }
                            >
                              Thanh toán
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-3">
                        Không có dữ liệu.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryPay;
