import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance"; // Import AxiosInstance

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([]); // Dữ liệu từ API
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu sau khi lọc
  const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm theo position_name
  const [filterType, setFilterType] = useState(""); // Lọc theo workType_name
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const rowsPerPage = 5; // Số hàng mỗi trang
  const [editingSalary, setEditingSalary] = useState(null); // Dữ liệu đang chỉnh sửa
  const [newSalary, setNewSalary] = useState(""); // Lương mới để chỉnh sửa

  // Gọi API lấy dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("http://localhost:3000/salary1hour");
        console.log("Dữ liệu từ API:", res.data.salaries); // Kiểm tra dữ liệu
        setSalaries(res.data.salaries); // Lưu dữ liệu vào state
        setFilteredData(res.data.salaries); // Lưu dữ liệu cho mục đích lọc
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);

  // Xử lý tìm kiếm và lọc
  useEffect(() => {
    let filtered = salaries;

    // Lọc theo workType_name (Full-time hoặc Part-time)
    if (filterType) {
      filtered = filtered.filter(
        (item) => item.workType.workType_name === filterType
      );
    }

    // Tìm kiếm theo position_name
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.position.position_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered); // Cập nhật danh sách được lọc
    setCurrentPage(1); // Reset về trang đầu tiên sau khi tìm kiếm hoặc lọc
  }, [searchQuery, filterType, salaries]);

  // Dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Tổng số trang
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Xử lý khi nhấn nút chỉnh sửa lương
  const handleEditSalary = (position_id, workType_id, currentSalary) => {
    setEditingSalary({ position_id, workType_id }); // Lưu thông tin đang chỉnh sửa
    setNewSalary(currentSalary); // Hiển thị giá trị lương hiện tại để chỉnh sửa
  };

  // Xử lý khi huỷ chỉnh sửa
  const handleCancelEdit = () => {
    setEditingSalary(null); // Huỷ chỉnh sửa
    setNewSalary(""); // Xoá giá trị lương đã nhập
  };

  // Xử lý khi lưu lương
  const handleSaveSalary = async () => {
    if (newSalary === "") {
      alert("Vui lòng nhập lương mới");
      return;
    }
    try {
      // Gửi yêu cầu cập nhật lương lên server
      const response = await AxiosInstance.patch('http://localhost:3000/salary1hour', {
        position_id: editingSalary.position_id,
        workType_id: editingSalary.workType_id,
        salary1hour: newSalary,
      });

      // Cập nhật lại dữ liệu sau khi lưu thành công
      const updatedSalaries = salaries.map((item) => 
        item.position_id === editingSalary.position_id &&
        item.workType_id === editingSalary.workType_id
          ? { ...item, salary1hour: parseInt(newSalary) }
          : item
      );

      setSalaries(updatedSalaries);
      setFilteredData(updatedSalaries);
      setEditingSalary(null); // Kết thúc chỉnh sửa
      setNewSalary(""); // Xoá giá trị đã nhập
    } catch (error) {
      // Xử lý lỗi nếu có
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert('Lỗi không xác định');
      }
    }
  };

  // Xử lý khi nhấn nút xoá lương
  const handleDeleteSalary = async (position_id, workType_id) => {
    try {
      await AxiosInstance.delete(`http://localhost:3000/salary1hour`, {
        data: { position_id, workType_id },
      });
      // Cập nhật dữ liệu sau khi xóa
      const updatedSalaries = salaries.filter(
        (item) => item.position_id !== position_id || item.workType_id !== workType_id
      );
      setSalaries(updatedSalaries);
      setFilteredData(updatedSalaries);
    } catch (error) {
      console.error("Lỗi khi xóa lương:", error);
    }
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#2c3e50", textAlign: "center" }}>Quản lý lương</h1>

      {/* Thanh tìm kiếm */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên vị trí..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "500px",
          }}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
          }}
        >
          <option value="">Tất cả loại công việc</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      {/* Bảng hiển thị */}
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
              Tên vị trí
            </th>
            <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
              Loại công việc
            </th>
            <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
              Lương/giờ
            </th>
            <th style={{ padding: "15px", border: "none", textAlign: "center" }}>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr
                key={`${item.position_id}-${item.workType_id}`}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                <td style={{ padding: "10px", border: "none", textAlign: "center" }}>
                  {item.position.position_name}
                </td>
                <td style={{ padding: "10px", border: "none", textAlign: "center" }}>
                  {item.workType.workType_name}
                </td>
                <td style={{ padding: "10px", border: "none", textAlign: "center" }}>
                  {item.position_id === editingSalary?.position_id && item.workType_id === editingSalary?.workType_id ? (
                    <input
                      type="number"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      placeholder="Nhập lương mới"
                      style={{ padding: "5px", width: "100px", textAlign: "center" }}
                    />
                  ) : (
                    item.salary1hour !== null ? item.salary1hour : "Chưa có"
                  )}
                </td>
                <td style={{ padding: "10px", border: "none", textAlign: "center" }}>
                  {item.position_id === editingSalary?.position_id && item.workType_id === editingSalary?.workType_id ? (
                    <>
                      <button
                        onClick={handleSaveSalary}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#3498db",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleEditSalary(item.position_id, item.workType_id, item.salary1hour)
                        }
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#f39c12",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteSalary(item.position_id, item.workType_id)
                        }
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      >
                        Xoá
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                Không có dữ liệu.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Trang trước
        </button>
        <span style={{ padding: "0 10px", fontSize: "16px" }}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default SalaryManagement;
