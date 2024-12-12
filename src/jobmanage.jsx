// import React, { useEffect, useState } from "react";
// import AxiosInstance from "./Components/AxiosInstance";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import { toast } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";

// const JobManage = () => {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [positions, setPositions] = useState([]);
//   const [selectedPosition, setSelectedPosition] = useState("");
//   const [selectedWorkType, setSelectedWorkType] = useState("");
//   const [currentEmployee, setCurrentEmployee] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     AxiosInstance.get("/currentpostion")
//       .then((res) => {
//         setEmployees(res.data);
//       })
//       .catch((error) => {
//         console.error("Lỗi khi gọi API:", error);
//         toast.error("Không thể tải dữ liệu nhân viên!");
//       });

//     AxiosInstance.get("/salary1hour/positions")
//       .then((res) => {
//         setPositions(res.data);
//       })
//       .catch((error) => {
//         console.error("Lỗi khi gọi API lấy chức vụ:", error);
//         toast.error("Không thể tải dữ liệu chức vụ!");
//       });
//   }, []);

//   const handleSearch = () => {
//     return employees.filter(
//       (emp) =>
//         emp.emp_name.toLowerCase().includes(search.toLowerCase()) ||
//         emp.emp_id.toLowerCase().includes(search.toLowerCase())
//     );
//   };

//   const filteredEmployees = handleSearch();

//   const handleDeletePosition = async (emp) => {
//     if (!emp.current_positions.length) {
//       toast.warning("Nhân viên này chưa có chức vụ để xóa!");
//       return;
//     }

//     try {
//       await AxiosInstance.delete("/currentpostion", {
//         data: {
//           emp_id: emp.emp_id,
//         },
//       });
//       toast.success(`Xóa chức vụ thành công cho ${emp.emp_name}!`);

//       setEmployees((prev) =>
//         prev.map((e) =>
//           e.emp_id === emp.emp_id ? { ...e, current_positions: [] } : e
//         )
//       );
//     } catch (error) {
//       console.error("Lỗi khi xóa chức vụ:", error);
//       toast.error("Xóa chức vụ thất bại!");
//     }
//   };

//   const handleAddPosition = (emp) => {
//     if (
//       emp.current_positions.length > 0 &&
//       emp.current_positions[0].position_name
//     ) {
//       toast.warning("Nhân viên đã có chức vụ, không thể thêm mới!");
//       return;
//     }
//     setCurrentEmployee(emp);
//   };

//   const handleSavePosition = async () => {
//     if (!selectedPosition || !selectedWorkType) {
//       toast.warning("Vui lòng chọn chức vụ và loại công việc!");
//       return;
//     }

//     try {
//       await AxiosInstance.post("/currentpostion", {
//         emp_id: currentEmployee.emp_id,
//         position_id: selectedPosition,
//         workType: selectedWorkType,
//       });

//       toast.success(`Thêm chức vụ thành công cho ${currentEmployee.emp_name}!`);
//       window.location.reload();
//     } catch (error) {
//       console.error("Lỗi khi lưu chức vụ:", error);
//       toast.error("Thêm chức vụ thất bại!");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <Navbar />
//       <h1 className="text-center mb-4">Quản Lý Chức Vụ</h1>

//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Tìm kiếm theo tên hoặc ID..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <table className="table table-bordered table-hover">
//         <thead className="table-primary">
//           <tr>
//             <th>ID</th>
//             <th>Tên</th>
//             <th>Số điện thoại</th>
//             <th>Chức vụ</th>
//             <th>Loại công việc</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredEmployees.map((emp) => (
//             <tr key={emp.emp_id}>
//               <td>{emp.emp_id}</td>
//               <td>{emp.emp_name}</td>
//               <td>{emp.emp_phone}</td>
//               <td>
//                 {emp.current_positions.length > 0
//                   ? emp.current_positions[0].position_name
//                   : "Chưa có"}
//               </td>
//               <td>
//                 {emp.current_positions.length > 0
//                   ? emp.current_positions[0].workType_name
//                   : "Chưa có"}
//               </td>
//               <td>
//                 <button
//                   className="btn btn-success btn-sm me-2"
//                   data-bs-toggle="modal"
//                   data-bs-target="#addPositionModal"
//                   onClick={() => handleAddPosition(emp)}
//                 >
//                   Thêm chức vụ
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => handleDeletePosition(emp)}
//                 >
//                   Xóa chức vụ
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal Thêm Chức Vụ */}
//       <div
//         className="modal fade"
//         id="addPositionModal"
//         tabIndex="-1"
//         aria-labelledby="addPositionModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="addPositionModalLabel">
//                 Thêm chức vụ
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label className="form-label">Chức vụ:</label>
//                 <select
//                   className="form-select"
//                   value={selectedPosition}
//                   onChange={(e) => setSelectedPosition(e.target.value)}
//                 >
//                   <option value="">Chọn chức vụ</option>
//                   {positions.map((position) => (
//                     <option
//                       key={position.position_id}
//                       value={position.position_id}
//                     >
//                       {position.position_name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Loại công việc:</label>
//                 <select
//                   className="form-select"
//                   value={selectedWorkType}
//                   onChange={(e) => setSelectedWorkType(e.target.value)}
//                 >
//                   <option value="">Chọn loại công việc</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Hủy
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSavePosition}
//                 data-bs-dismiss="modal"
//               >
//                 Lưu
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobManage;

import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JobManage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get("/currentpostion")
      .then((res) => setEmployees(res.data))
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Không thể tải dữ liệu nhân viên!");
      });

    AxiosInstance.get("/salary1hour/positions")
      .then((res) => setPositions(res.data))
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
      await AxiosInstance.delete("/currentpostion", {
        data: {
          emp_id: emp.emp_id,
        },
      });
      toast.success(`Xóa chức vụ thành công cho ${emp.emp_name}!`);

      setEmployees((prev) =>
        prev.map((e) =>
          e.emp_id === emp.emp_id ? { ...e, current_positions: [] } : e
        )
      );
    } catch (error) {
      console.error("Lỗi khi xóa chức vụ:", error);
      toast.error("Xóa chức vụ thất bại!");
    }
  };

  const handleAddPosition = (emp) => {
    if (
      emp.current_positions.length > 0 &&
      emp.current_positions[0].position_name
    ) {
      toast.warning("Nhân viên đã có chức vụ, không thể thêm mới!");
      return;
    }
    setCurrentEmployee(emp);
  };

  const handleSavePosition = async () => {
    if (!selectedPosition || !selectedWorkType) {
      toast.warning("Vui lòng chọn chức vụ và loại công việc!");
      return;
    }

    try {
      await AxiosInstance.post("/currentpostion", {
        emp_id: currentEmployee.emp_id,
        position_id: selectedPosition,
        workType: selectedWorkType,
      });

      toast.success(`Thêm chức vụ thành công cho ${currentEmployee.emp_name}!`);
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi lưu chức vụ:", error);
      toast.error("Thêm chức vụ thất bại!");
    }
  };

  return (
    <div className="container mt-4" style={{ paddingTop: "100px" }}>
      <Navbar />

      <h1 className="text-begin mb-4">
        {" "}
        <i class="bi bi-buildings mx-2"></i>Quản Lý Chức Vụ
      </h1>

      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Danh Sách Chức Vụ Nhân Viên</h5>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Tìm kiếm theo tên hoặc ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table  table-hover mb-0">
            <thead className="table">
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Số Điện Thoại</th>
                <th>Chức Vụ</th>
                <th>Loại Công Việc</th>
                <th>Hành Động</th>
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
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#addPositionModal"
                      onClick={() => handleAddPosition(emp)}
                    >
                      Thêm chức vụ
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
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
      </div>

      {/* Modal Thêm Chức Vụ */}
      <div
        className="modal fade"
        id="addPositionModal"
        tabIndex="-1"
        aria-labelledby="addPositionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPositionModalLabel">
                Thêm chức vụ
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Chức vụ:</label>
                <select
                  className="form-select"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                >
                  <option value="">Chọn chức vụ</option>
                  {positions.map((position) => (
                    <option
                      key={position.position_id}
                      value={position.position_id}
                    >
                      {position.position_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Loại công việc:</label>
                <select
                  className="form-select"
                  value={selectedWorkType}
                  onChange={(e) => setSelectedWorkType(e.target.value)}
                >
                  <option value="">Chọn loại công việc</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSavePosition}
                data-bs-dismiss="modal"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
