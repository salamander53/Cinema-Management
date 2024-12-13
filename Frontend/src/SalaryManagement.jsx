import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance";
import Navbar from "./Navbar";

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [editingSalary, setEditingSalary] = useState(null);
  const [newSalary, setNewSalary] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("/salary1hour");
        setSalaries(res.data.salaries);
        setFilteredData(res.data.salaries);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = salaries;
    if (filterType) {
      filtered = filtered.filter(
        (item) => item.workType.workType_name === filterType
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.position.position_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterType, salaries]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleEditSalary = (position_id, workType_id, currentSalary) => {
    setEditingSalary({ position_id, workType_id });
    setNewSalary(currentSalary);
  };

  const handleCancelEdit = () => {
    setEditingSalary(null);
    setNewSalary("");
  };

  const handleSaveSalary = async () => {
    if (newSalary === "") {
      alert("Vui lòng nhập lương mới");
      return;
    }
    try {
      const response = await AxiosInstance.patch("salary1hour", {
        position_id: editingSalary.position_id,
        workType_id: editingSalary.workType_id,
        salary1hour: newSalary,
      });

      const updatedSalaries = salaries.map((item) =>
        item.position_id === editingSalary.position_id &&
        item.workType_id === editingSalary.workType_id
          ? { ...item, salary1hour: parseInt(newSalary) }
          : item
      );

      setSalaries(updatedSalaries);
      setFilteredData(updatedSalaries);
      setEditingSalary(null);
      setNewSalary("");
    } catch (error) {
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert("Lỗi không xác định");
      }
    }
  };

  const handleDeleteSalary = async (position_id, workType_id) => {
    try {
      await AxiosInstance.delete(`/salary1hour`, {
        data: { position_id, workType_id },
      });
      const updatedSalaries = salaries.filter(
        (item) =>
          item.position_id !== position_id || item.workType_id !== workType_id
      );
      setSalaries(updatedSalaries);
      setFilteredData(updatedSalaries);
    } catch (error) {
      console.error("Lỗi khi xóa lương:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <Navbar />
      <h1 className="text text mb-4">Quản lý lương</h1>

      {/* Thanh tìm kiếm */}
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên vị trí..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control me-2"
          style={{ width: "500px" }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="form-select"
          style={{ width: "200px" }}
        >
          <option value="">Tất cả loại công việc</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      {/* Card container for table */}
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh sách lương</h5>
        </div>

        {/* Bảng hiển thị */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th className="text-center">Tên vị trí</th>
                <th className="text-center">Loại công việc</th>
                <th className="text-center">Lương/giờ</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={`${item.position_id}-${item.workType_id}`}>
                    <td className="text-center">
                      {item.position.position_name}
                    </td>
                    <td className="text-center">
                      {item.workType.workType_name}
                    </td>
                    <td className="text-center">
                      {item.position_id === editingSalary?.position_id &&
                      item.workType_id === editingSalary?.workType_id ? (
                        <input
                          type="number"
                          value={newSalary}
                          onChange={(e) => setNewSalary(e.target.value)}
                          placeholder="Nhập lương mới"
                          className="form-control"
                          style={{ width: "120px", margin: "0 auto" }}
                        />
                      ) : item.salary1hour !== null ? (
                        item.salary1hour
                      ) : (
                        "Chưa có"
                      )}
                    </td>
                    <td className="text-center">
                      {item.position_id === editingSalary?.position_id &&
                      item.workType_id === editingSalary?.workType_id ? (
                        <>
                          <button
                            onClick={handleSaveSalary}
                            className="btn btn-success me-2"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="btn btn-danger"
                          >
                            Hủy
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleEditSalary(
                                item.position_id,
                                item.workType_id,
                                item.salary1hour
                              )
                            }
                            className="btn btn-warning me-2"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSalary(
                                item.position_id,
                                item.workType_id
                              )
                            }
                            className="btn btn-danger"
                          >
                            Xóa
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    Không có dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phân trang */}
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-primary me-2"
        >
          Trang trước
        </button>
        <span className="align-self-center">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-primary ms-2"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default SalaryManagement;
