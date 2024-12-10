import React, { useEffect, useState } from "react";
import AxiosInstance from "./Components/AxiosInstance"; 
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  margin: 2rem auto;
  max-width: 800px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #343a40;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;

const Thead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const Th = styled.th`
  padding: 12px;
  text-align: center;
`;

const Td = styled.td`
  padding: 12px;
  text-align: center;
  border: 1px solid #dee2e6;
`;

const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #f8f9fa;
  }
  &:hover {
    background-color: #e9ecef;
  }
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h5`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
  cursor: pointer;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  &:hover {
    background-color: #5a6268;
  }
`;

const ShiftManage = () => {
  const [workHours, setWorkHours] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [workHourInput, setWorkHourInput] = useState("");

  useEffect(() => {
    // Use AxiosInstance to fetch work hours
    AxiosInstance.get("/workhour")
      .then((res) => setWorkHours(res.data.workHours))
      .catch(() => toast.error("Không thể tải dữ liệu giờ làm việc!"));

    // Use AxiosInstance to fetch employees
    AxiosInstance.get("/employee")
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error("Không thể tải dữ liệu nhân viên!"));
  }, []);

  const handleSearch = () => {
    return workHours.filter((work) => {
      const employee = employees.find((emp) => emp.emp_id === work.emp_id);
      return (
        employee &&
        (employee.emp_name.toLowerCase().includes(search.toLowerCase()) ||
          work.emp_id.toLowerCase().includes(search.toLowerCase()))
      );
    });
  };

  const filteredWorkHours = handleSearch();

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

      // Use AxiosInstance to post new shift data
      await AxiosInstance.post("/workhour", newShift);
      toast.success("Thêm ca thành công!");
      setWorkHours((prev) => [...prev, newShift]);
      setShowForm(false);
      setSelectedEmployee("");
      setWorkHourInput("");
    } catch {
      toast.error("Thêm ca thất bại!");
    }
  };

  return (
    <Container>
      <Title>Quản Lý Ca Làm Việc</Title>
      <SearchInput
        type="text"
        placeholder="Tìm kiếm theo tên nhân viên hoặc ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <Thead>
          <tr>
            <Th>Tên Nhân Viên</Th>
            <Th>ID Nhân Viên</Th>
            <Th>ID Rạp Phim</Th>
            <Th>Số Giờ Làm</Th>
          </tr>
        </Thead>
        <tbody>
          {filteredWorkHours.map((work) => {
            const employee = employees.find((emp) => emp.emp_id === work.emp_id);
            return (
              <Tr key={work.log_id}>
                <Td>{employee ? employee.emp_name : "Không xác định"}</Td>
                <Td>{work.emp_id}</Td>
                <Td>{work.cinema_id}</Td>
                <Td>{work.workhour}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
      <AddButton onClick={() => setShowForm(true)}>Thêm Ca</AddButton>
      {showForm && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Thêm Ca Làm Việc</ModalTitle>
              <CloseButton onClick={() => setShowForm(false)}>&times;</CloseButton>
            </ModalHeader>
            <FormGroup>
              <FormLabel>Chọn Nhân Viên:</FormLabel>
              <FormSelect
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Chọn nhân viên</option>
                {employees.map((emp) => (
                  <option key={emp.emp_id} value={emp.emp_id}>
                    {emp.emp_name} - {emp.emp_id}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Số Giờ Làm Việc:</FormLabel>
              <FormInput
                type="number"
                value={workHourInput}
                onChange={(e) => setWorkHourInput(e.target.value)}
                placeholder="Nhập số giờ làm việc"
              />
            </FormGroup>
            <div>
              <SaveButton onClick={handleSaveShift}>Lưu</SaveButton>
              <CancelButton onClick={() => setShowForm(false)}>Hủy</CancelButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ShiftManage;
