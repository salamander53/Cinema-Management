// Cinema.jsx
import "./Cinema.css"

import React, { useState } from "react";

import { Link } from "react-router-dom";

// Sample data for movie theaters with employees
const theatersData = [
  {
    id: 1,
    name: "Cinema 1",
    location: "Downtown",
    employees: [
      {
        id: 1,
        name: "John Doe",
        position: "Manager",
        email: "john.doe@example.com",
        phone: "123-456-7890",
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Ticket Seller",
        email: "jane.smith@example.com",
        phone: "234-567-8901",
      },
    ],
  },
  {
    id: 2,
    name: "Cinema 2",
    location: "Uptown",
    employees: [
      {
        id: 3,
        name: "Michael Johnson",
        position: "Cleaner",
        email: "michael.johnson@example.com",
        phone: "345-678-9012",
      },
      {
        id: 4,
        name: "Sarah Lee",
        position: "Security",
        email: "sarah.lee@example.com",
        phone: "456-789-0123",
      },
    ],
  },
  {
    id: 3,
    name: "Cinema 3",
    location: "Suburb",
    employees: [
      {
        id: 5,
        name: "David Brown",
        position: "Manager",
        email: "david.brown@example.com",
        phone: "567-890-1234",
      },
      {
        id: 6,
        name: "Emily White",
        position: "Concessions",
        email: "emily.white@example.com",
        phone: "678-901-2345",
      },
    ],
  },
];

function MovieTheaterManagement() {
  const [selectedTheater, setSelectedTheater] = useState(null); // Selected theater state
  const [theaters, setTheaters] = useState(theatersData); // State for theaters data
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true); // Sorting order state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
  }); // New employee form data
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null); // Employee being edited state
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
  }); // Employee details for editing

  // Handle theater click: open/close movie theater box
  const handleTheaterClick = (theater) => {
    if (selectedTheater && selectedTheater.id === theater.id) {
      setSelectedTheater(null); // Deselect theater if clicked again
    } else {
      setSelectedTheater(theater); // Select the clicked theater
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort toggle (A-Z or Z-A)
  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  // Open the Add Employee modal
  const handleAddEmployeeClick = (theater) => {
    if (theater) {
      setSelectedTheater(theater); // Keep the selected theater as it is
      setIsModalOpen(true); // Open the modal
    } else {
      alert("Please select a theater to add an employee.");
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form input change for adding new employee
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Add a new employee to the selected theater
  const handleAddEmployee = (e) => {
    e.preventDefault();

    // Ensure that selectedTheater is not null before attempting to add employee
    if (selectedTheater) {
      // Create the new employee object
      const newEmp = {
        id: selectedTheater.employees.length + 1, // ID based on current list length
        ...newEmployee,
      };

      // Update the theaters data
      const updatedTheaters = theaters.map((t) =>
        t.id === selectedTheater.id
          ? { ...t, employees: [...t.employees, newEmp] }
          : t
      );
      setTheaters(updatedTheaters);

      // Close the modal after adding employee
      closeModal();

      // Clear the form
      setNewEmployee({
        name: "",
        position: "",
        email: "",
        phone: "",
      });
    }
  };

  // Delete an employee from the selected theater
  const handleDeleteEmployee = (theaterId, employeeId) => {
    const updatedTheaters = theaters.map((theater) =>
      theater.id === theaterId
        ? {
            ...theater,
            employees: theater.employees.filter((emp) => emp.id !== employeeId),
          }
        : theater
    );
    setTheaters(updatedTheaters);
  };

  // Edit an employee's profile (This can be expanded to show a form later)
  const handleEditEmployee = (employee, e) => {
    e.stopPropagation();
    setEmployeeBeingEdited(employee); // Set employee to be edited
    setEditedEmployee({ ...employee }); // Set the data to pre-fill the form
  };

  // Handle form input change for editing employee
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  // Submit edited employee details
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      ...employeeBeingEdited,
      ...editedEmployee,
    };

    const updatedTheaters = theaters.map((theater) => {
      if (theater.id === selectedTheater.id) {
        const updatedEmployees = theater.employees.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        return { ...theater, employees: updatedEmployees };
      }
      return theater;
    });

    setTheaters(updatedTheaters);
    setEmployeeBeingEdited(null); // Close the modal after saving
  };

  // Filter theaters based on the search term
  const filteredTheaters = theaters
    .filter((theater) =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (isAscending) {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });

  return (
    <div>
      <h2>Movie Theater Management</h2>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search by theater name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Sorting Button */}
      <div>
        <button
          onClick={handleSort}
          className={`sort-button ${isAscending ? "ascending" : "descending"}`}
        >
          Alphabetical
        </button>
      </div>

      {/* Movie Theater List */}
      <ul className="theater-list">
        {filteredTheaters.map((theater) => (
          <li
            key={theater.id}
            className={`theater-item ${
              selectedTheater && selectedTheater.id === theater.id
                ? "selected"
                : ""
            }`}
            onClick={() => handleTheaterClick(theater)}
          >
            <div className="theater-header">
              <p className="theater-name">{theater.name}</p>
              <p className="theater-location">{theater.location}</p>
            </div>

            <button
              className="add-employee-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the theater box from toggling when clicking "Add Employee"
                handleAddEmployeeClick(theater);
              }}
            >
              Add Employee
            </button>

            {selectedTheater && selectedTheater.id === theater.id && (
              <div className="employee-list">
                <h4>Employees at {theater.name}:</h4>
                <ul>
                  {theater.employees.map((employee) => (
                    <li key={employee.id} className="employee-item">
                      <div className="employee-info">
                        <p className="employee-name">{employee.name}</p>
                        <p className="employee-position">{employee.position}</p>
                        <p className="employee-email">{employee.email}</p>
                        <p className="employee-phone">{employee.phone}</p>
                      </div>
                      <div className="employee-actions">
                        <button
                          onClick={(e) => handleEditEmployee(employee, e)}
                          className="edit-button"
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteEmployee(theater.id, employee.id)
                          }
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for Adding Employee */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Employee</h3>
            <form onSubmit={handleAddEmployee}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className="submit-button">
                Add Employee
              </button>
            </form>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Editing Employee */}
      {employeeBeingEdited && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Employee</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedEmployee.name}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  name="position"
                  value={editedEmployee.position}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editedEmployee.email}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={editedEmployee.phone}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <button type="submit" className="submit-button">
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setEmployeeBeingEdited(null)}
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieTheaterManagement;
