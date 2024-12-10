import React, { useState, useEffect } from "react";
import AxiosInstance from "./Components/AxiosInstance";

const Cinema = () => {
  const [cinemas, setCinemas] = useState([]);
  const [filteredCinemas, setFilteredCinemas] = useState([]);
  const [filter, setFilter] = useState("");
  const [newCinema, setNewCinema] = useState({
    cinema_name: "",
    cinema_address: "",
  });
  const [loading, setLoading] = useState(true);

  // New state for managing modals (forms)
  const [showAddCinemaForm, setShowAddCinemaForm] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  // Fetch cinema data
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await AxiosInstance.get("/cinema");
        setCinemas(response.data);
        setFilteredCinemas(response.data);
      } catch (error) {
        console.error("Error fetching cinema data:", error);
        alert("Cannot fetch cinema data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCinemas();
  }, []);

  // Handle filter input
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredCinemas(
      cinemas.filter(
        (cinema) =>
          cinema.cinema_id.toLowerCase().includes(value) ||
          cinema.cinema_name.toLowerCase().includes(value) ||
          cinema.cinema_address.toLowerCase().includes(value)
      )
    );
  };

  // Handle adding a new cinema
  const handleAddCinema = async () => {
    if (!newCinema.cinema_name || !newCinema.cinema_address) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const response = await AxiosInstance.post("/cinema", newCinema);
      setCinemas((prev) => [...prev, response.data]);
      setFilteredCinemas((prev) => [...prev, response.data]);
      setNewCinema({ cinema_name: "", cinema_address: "" });
      alert("Cinema added successfully!");
    } catch (error) {
      console.error("Error adding cinema:", error);
      alert("Failed to add cinema. Please try again.");
    }
  };

  // Handle deleting a cinema
  const handleDeleteCinema = async (cinema_id) => {
    try {
      await AxiosInstance.delete(`/cinema/${cinema_id}`);
      setCinemas((prev) => prev.filter((cinema) => cinema.cinema_id !== cinema_id));
      setFilteredCinemas((prev) => prev.filter((cinema) => cinema.cinema_id !== cinema_id));
      alert("Cinema deleted successfully!");
    } catch (error) {
      console.error("Error deleting cinema:", error);
      alert("Failed to delete cinema. Please try again.");
    }
  };

  // Handle viewing employees in a cinema
  const handleViewEmployees = async (cinema_id) => {
    try {
      // Fetching employee data for the selected cinema
      const response = await AxiosInstance.get(`http://20.249.67.154/cinema/${cinema_id}/employee`);
      setEmployeeData(response.data);
      setSelectedCinemaId(cinema_id);
      setShowEmployeeModal(true); // Show employee modal
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employees. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Cinema Management</h1>

      {/* Filter Input */}
      <input
        type="text"
        value={filter}
        onChange={handleFilter}
        placeholder="Filter by ID, name, or address"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Button to show form for adding cinema */}
      <button
        onClick={() => setShowAddCinemaForm(true)}
        style={{
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        Add Cinema
      </button>

      {/* Add Cinema Form (only visible when showAddCinemaForm is true) */}
      {showAddCinemaForm && (
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h3>Add New Cinema</h3>
          <input
            type="text"
            placeholder="Cinema Name"
            value={newCinema.cinema_name}
            onChange={(e) => setNewCinema({ ...newCinema, cinema_name: e.target.value })}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Cinema Address"
            value={newCinema.cinema_address}
            onChange={(e) => setNewCinema({ ...newCinema, cinema_address: e.target.value })}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button
            onClick={handleAddCinema}
            style={{
              padding: "5px 10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Cinema
          </button>
          <button
            onClick={() => setShowAddCinemaForm(false)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginLeft: "10px",
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Cinema Table */}
      {loading ? (
        <div>Loading cinemas...</div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#007bff", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Cinema ID</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Address</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCinemas.map((cinema) => (
              <tr key={cinema.cinema_id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px", textAlign: "center" }}>{cinema.cinema_id}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{cinema.cinema_name}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{cinema.cinema_address}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button
                    onClick={() => handleViewEmployees(cinema.cinema_id)}
                    style={{
                      marginRight: "5px",
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    View Employees
                  </button>
                  <button
                    onClick={() => handleDeleteCinema(cinema.cinema_id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Overlay Modal for Viewing Employees */}
      {showEmployeeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              overflow: "auto",
            }}
          >
            <h3>Employees in Cinema {selectedCinemaId}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                <tr>
                  <th style={{ padding: "10px" }}>Employee ID</th>
                  <th style={{ padding: "10px" }}>Employee Name</th>
                  <th style={{ padding: "10px" }}>Birth Date</th>
                  <th style={{ padding: "10px" }}>CCCD</th>
                  <th style={{ padding: "10px" }}>Address</th>
                  <th style={{ padding: "10px" }}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee) => (
                  <tr key={employee.emp_id}>
                    <td style={{ padding: "10px" }}>{employee.emp_id}</td>
                    <td style={{ padding: "10px" }}>{employee.emp_name}</td>
                    <td style={{ padding: "10px" }}>{employee.emp_birth_date}</td>
                    <td style={{ padding: "10px" }}>{employee.emp_cccd}</td>
                    <td style={{ padding: "10px" }}>{employee.emp_address}</td>
                    <td style={{ padding: "10px" }}>{employee.emp_phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setShowEmployeeModal(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginTop: "20px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cinema;
