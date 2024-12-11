// import React, { useState, useEffect } from "react";
// import AxiosInstance from "./Components/AxiosInstance.jsx"; // Importing AxiosInstance
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar.jsx";

// const Employee = () => {
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({
//     emp_name: "",
//     emp_birth_date: "",
//     emp_cccd: "",
//     emp_address: "",
//     emp_phone: "",
//     cinemaid: "", // Added cinemaid to state
//   });

//   const handleSearch = (e) => setSearch(e.target.value);

//   const handleDelete = (id) => {
//     if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
//       AxiosInstance.delete(`employee/${id}`)
//         .then(() => {
//           const filteredEmployees = employees.filter(
//             (employee) => employee.emp_id !== id
//           );
//           setEmployees(filteredEmployees);
//         })
//         .catch((error) => {
//           console.log("Lỗi khi xoá nhân viên: ", error);
//         });
//     }
//   };

//   const handleAdd = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee({ ...newEmployee, [name]: value });
//   };

//   const handleSave = () => {
//     AxiosInstance.post("employee/", newEmployee)
//       .then((res) => {
//         AxiosInstance.get("employee/") // Fetch employees after adding a new one
//           .then((response) => {
//             setEmployees(response.data); // Update employee list
//             setShowForm(false); // Close the form
//           })
//           .catch((error) => {
//             console.log("Lỗi khi gọi API để lấy danh sách nhân viên: ", error);
//           });
//       })
//       .catch((error) => {
//         console.log("Lỗi khi thêm nhân viên: ", error);
//       });
//   };

//   const filteredEmployees = employees.filter(
//     (employee) =>
//       employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
//       employee.emp_id.toLowerCase().includes(search.toLowerCase())
//   );

//   useEffect(() => {
//     AxiosInstance.get("employee/") // Use AxiosInstance to fetch data
//       .then((res) => {
//         setEmployees(res.data);
//       })
//       .catch((error) => {
//         console.log("Lỗi khi gọi API: ", error);
//       });
//   }, [employees]);

//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [selectedCinemaId, setSelectedCinemaId] = useState("");
//   const [cinema, setCinema] = useState([]);

//   useEffect(() => {
//     AxiosInstance.get("cinema/")
//       .then((res) => {
//         setCinema(res.data);
//       })
//       .catch((error) => {
//         console.log("Lỗi khi gọi API: ", error);
//       });
//   }, []);

//   const handleAppointClick = (employee) => {
//     setSelectedEmployee(employee);
//     setSelectedCinemaId("");
//   };

//   const handleSaveCinema = () => {
//     if (selectedEmployee && selectedCinemaId) {
//       AxiosInstance.post("/employee/cinema", {
//         cinema_id: selectedCinemaId,
//         emp_id: selectedEmployee.emp_id,
//       })
//         .then((response) => {
//           console.log(
//             "Employee appointed to cinema successfully:",
//             response.data
//           );
//         })
//         .catch((error) => {
//           console.error("Error appointing employee to cinema:", error);
//         });
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <h1 className="mt-5 mb-4">
//         <i className="fas fa-users"></i> Quản Lý Nhân Viên
//       </h1>

//       <button className="btn btn-primary mb-3" onClick={handleAdd}>
//         <i className="fas fa-user-plus"></i> Thêm Nhân Viên
//       </button>

//       {showForm && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           aria-labelledby="formModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="formModalLabel">
//                   Thêm Nhân Viên Mới
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={handleCloseForm}
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form>
//                   <div className="mb-3">
//                     <label className="form-label">Tên:</label>
//                     <input
//                       type="text"
//                       name="emp_name"
//                       value={newEmployee.emp_name}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Ngày Sinh:</label>
//                     <input
//                       type="date"
//                       name="emp_birth_date"
//                       value={newEmployee.emp_birth_date}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">CCCD:</label>
//                     <input
//                       type="text"
//                       name="emp_cccd"
//                       value={newEmployee.emp_cccd}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Địa Chỉ:</label>
//                     <input
//                       type="text"
//                       name="emp_address"
//                       value={newEmployee.emp_address}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Số Điện Thoại:</label>
//                     <input
//                       type="text"
//                       name="emp_phone"
//                       value={newEmployee.emp_phone}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <button
//                       type="button"
//                       className="btn btn-success"
//                       onClick={handleSave}
//                     >
//                       Lưu
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       onClick={handleCloseForm}
//                     >
//                       Hủy
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="w-100 rounded bg-white border shadow" style={{}}>
//         <div className="d-flex justify-content-end mt-3 align-items-end border-bottom">
//           <div className="flex-grow-1 mx-3">
//             <h5>Patient List</h5>
//           </div>
//           <Link to="/patient/add" className="btn btn-success me-5 py-1 mb-3 ">
//             {" "}
//             + New Patient{" "}
//           </Link>
//           <div className="mb-2 me-3">
//             <i className="bi bi-people" style={{ fontSize: "1.9rem" }}></i>
//           </div>
//           <div className="d-flex flex-grow-1 align-items-center mx-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Tìm kiếm theo Tên hoặc ID"
//               value={search}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>

//         <table className="table table-striped ">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Tên</th>
//               <th>Ngày Sinh</th>
//               <th>CCCD</th>
//               <th>Địa Chỉ</th>
//               <th>Số Điện Thoại</th>
//               <th>Tên Rạp</th>
//               <th>Hành Động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEmployees.map((employee) => (
//               <tr key={employee.emp_id}>
//                 <td>{employee.emp_id}</td>
//                 <td>{employee.emp_name}</td>
//                 <td>{employee.emp_birth_date}</td>
//                 <td>{employee.emp_cccd}</td>
//                 <td>{employee.emp_address}</td>
//                 <td>{employee.emp_phone}</td>
//                 <td>{employee.cinema_id}</td>
//                 <td>
//                   <button
//                     className="btn btn-success"
//                     data-bs-toggle="modal"
//                     data-bs-target="#AddCinemaModal"
//                     onClick={() => handleAppointClick(employee)}
//                   >
//                     Bổ Nhiệm
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(employee.emp_id)}
//                     title="Xóa"
//                   >
//                     Xóa
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div
//         className="modal fade"
//         id="AddCinemaModal"
//         tabIndex="-1"
//         aria-labelledby="AddCinemaModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="AddCinemaModalLabel">
//                 Bổ nhiệm rạp cho nhân viên
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               {selectedEmployee && (
//                 <div>
//                   <p>Nhân viên: {selectedEmployee.emp_name}</p>
//                   <div className="mb-3">
//                     <label htmlFor="cinemaId" className="form-label">
//                       Chọn Rạp
//                     </label>
//                     <select
//                       id="cinemaId"
//                       className="form-select"
//                       value={selectedCinemaId}
//                       onChange={(e) => setSelectedCinemaId(e.target.value)}
//                     >
//                       <option value="">Chọn rạp...</option>
//                       {cinema.map((cinema) => (
//                         <option key={cinema.cinema_id} value={cinema.cinema_id}>
//                           {cinema.cinema_name} - {cinema.cinema_id}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Đóng
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSaveCinema}
//               >
//                 Lưu thay đổi
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Employee;

import React, { useState, useEffect } from "react";
import AxiosInstance from "./Components/AxiosInstance.jsx"; // Importing AxiosInstance
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { toast } from "react-toastify";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    emp_name: "",
    emp_birth_date: "",
    emp_cccd: "",
    emp_address: "",
    emp_phone: "",
    cinemaid: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [cinema, setCinema] = useState([]);

  useEffect(() => {
    AxiosInstance.get("employee/")
      .then((res) => setEmployees(res.data))
      .catch((error) => console.log("Error fetching employees:", error));

    AxiosInstance.get("cinema/")
      .then((res) => setCinema(res.data))
      .catch((error) => console.log("Error fetching cinemas:", error));
  }, [employees]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      AxiosInstance.delete(`employee/${id}`)
        .then(() =>
          setEmployees((prev) => prev.filter((emp) => emp.emp_id !== id))
        )
        .catch((error) => console.log("Error deleting employee:", error));
    }
  };

  const handleAdd = () => setShowForm(true);

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSave = () => {
    AxiosInstance.post("employee/", newEmployee)
      .then(() => {
        AxiosInstance.get("employee/")
          .then((res) => setEmployees(res.data))
          .catch((error) => console.log("Error refreshing employees:", error));
        setShowForm(false);
      })
      .catch((error) => console.log("Error adding employee:", error));
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
      employee.emp_id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAppointClick = (employee) => {
    setSelectedEmployee(employee);
    setSelectedCinemaId("");
  };

  const handleSaveCinema = () => {
    if (selectedEmployee && selectedCinemaId) {
      AxiosInstance.post("/employee/cinema", {
        cinema_id: selectedCinemaId,
        emp_id: selectedEmployee.emp_id,
      })
        .then(() => {
          // alert("Bổ nhiệm thành công");
          toast.success("Bổ nhiệm thành công");
        })
        .catch((error) =>
          console.error("Error appointing employee to cinema:", error)
        );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container " style={{ paddingTop: "100px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text">
            <i className="fas fa-users me-2"></i>Quản Lý Nhân Viên
          </h1>
          <button className="btn btn-primary" onClick={handleAdd}>
            <i className="fas fa-user-plus me-2"></i>Thêm Nhân Viên
          </button>
        </div>

        {showForm && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Thêm Nhân Viên Mới</h5>
                  <button
                    className="btn-close"
                    onClick={handleCloseForm}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    {[
                      { label: "Tên", name: "emp_name", type: "text" },
                      {
                        label: "Ngày Sinh",
                        name: "emp_birth_date",
                        type: "date",
                      },
                      { label: "CCCD", name: "emp_cccd", type: "text" },
                      { label: "Địa Chỉ", name: "emp_address", type: "text" },
                      {
                        label: "Số Điện Thoại",
                        name: "emp_phone",
                        type: "text",
                      },
                    ].map(({ label, name, type }) => (
                      <div className="mb-3" key={name}>
                        <label className="form-label">{label}:</label>
                        <input
                          type={type}
                          name={name}
                          value={newEmployee[name]}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    ))}
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleSave}
                      >
                        Lưu
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseForm}
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card shadow">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Danh Sách Nhân Viên</h5>
            <input
              type="text"
              className="form-control w-25"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Ngày Sinh</th>
                  <th>CCCD</th>
                  <th>Địa Chỉ</th>
                  <th>Số Điện Thoại</th>
                  <th>Mã Rạp</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td>{employee.emp_id}</td>
                    <td>{employee.emp_name}</td>
                    <td>{employee.emp_birth_date}</td>
                    <td>{employee.emp_cccd}</td>
                    <td>{employee.emp_address}</td>
                    <td>{employee.emp_phone}</td>
                    <td>{employee.cinema_id}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#AddCinemaModal"
                        onClick={() => handleAppointClick(employee)}
                      >
                        Bổ Nhiệm
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.emp_id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="AddCinemaModal"
        tabIndex="-1"
        aria-labelledby="AddCinemaModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddCinemaModalLabel">
                Bổ nhiệm rạp cho nhân viên
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedEmployee && (
                <div>
                  <p>Nhân viên: {selectedEmployee.emp_name}</p>
                  <div className="mb-3">
                    <label htmlFor="cinemaId" className="form-label">
                      Chọn Rạp
                    </label>
                    <select
                      id="cinemaId"
                      className="form-select"
                      value={selectedCinemaId}
                      onChange={(e) => setSelectedCinemaId(e.target.value)}
                    >
                      <option value="">Chọn rạp...</option>
                      {cinema.map((cinema) => (
                        <option key={cinema.cinema_id} value={cinema.cinema_id}>
                          {cinema.cinema_name} - {cinema.cinema_id}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveCinema}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
