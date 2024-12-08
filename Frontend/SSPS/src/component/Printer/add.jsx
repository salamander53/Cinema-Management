// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AxiosInstance from "../Axios";

// export default function AddPrinter() {

//   // // State để quản lý danh sách máy in
//   // const [printers, setPrinters] = useState([]);

//   // // Thêm máy in mới vào API
//   // const addPrinter = async (newPrinter) => {
//   //   try {
//   //     const response = await AxiosInstance.post("/printers", newPrinter);
//   //     setPrinters((prevPrinters) => [...prevPrinters, response.data]);
//   //   } catch (error) {
//   //     console.error("Lỗi khi thêm máy in mới:", error);
//   //   }
//   // };
//   // const [data, setData] = useState({
//   //   name: nu
//   // })
//   // AxiosInstance.post("/printers",newPrinter)

//   const [printerName, setPrinterName] = useState("");
//   const [printerIP, setPrinterIP] = useState("");
//   const [printerLocation, setPrinterLocation] = useState("");
//   const [printerImage, setPrinterImage] = useState(null);
//   const [status, setStatus] = useState("Đã kích hoạt"); // Trạng thái ban đầu
//   const [statusClass, setStatusClass] = useState("active"); // Trạng thái class ban đầu
//   const navigate = useNavigate();

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setPrinterImage(URL.createObjectURL(file));
//     }
//   };

//   const handleStatusChange = (event) => {
//     const selectedStatus = event.target.value;
//     setStatus(selectedStatus);
//     setStatusClass(selectedStatus === "Đã kích hoạt" ? "active" : "inactive");
//   };

//   const handleSavePrinter = () => {
//     const newPrinter = {
//       name: printerName,
//       status: status, // Trạng thái đã chọn
//       condition: "Sẵn sàng", // Trạng thái của máy in
//       ip: printerIP,
//       location: printerLocation,
//       lastUsed: new Date().toLocaleString(),
//       statusClass: statusClass, // Class trạng thái
//     };
//     addPrinter(newPrinter); // Thêm máy in mới với trạng thái đã thay đổi
//     navigate("/printers");
//   };

//   return (
//     <div className="add-printer-container">
      // <h2>Thêm máy in mới</h2>
      // <div className="form-wrapper">
      //   <div className="form-group-left">
      //     <div className="input-file-wrapper">
      //       <label>Ảnh:</label>
      //       <input type="file" accept="image/*" onChange={handleImageChange} />
      //       {printerImage && (
      //         <div className="image-preview">
      //           <img src={printerImage} alt="Preview" />
      //         </div>
      //       )}
      //     </div>

      //     {/* Dropdown để chọn trạng thái */}
      //     <div className="status-dropdown">
      //       <label>Chọn trạng thái máy in:</label>
      //       <select value={status} onChange={handleStatusChange}>
      //         <option value="Đã kích hoạt">kích hoạt</option>
      //         <option value="Chưa kích hoạt">Không kích hoạt</option>
      //       </select>
      //     </div>
      //   </div>

      //   <div className="form-group-right">
      //     <div className="form-group">
      //       <label>Tên máy in:</label>
      //       <input
      //         type="text"
      //         placeholder="Nhập tên máy in"
      //         value={printerName}
      //         onChange={(e) => setPrinterName(e.target.value)}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label>Địa chỉ IP:</label>
      //       <input
      //         type="text"
      //         placeholder="Nhập địa chỉ IP"
      //         value={printerIP}
      //         onChange={(e) => setPrinterIP(e.target.value)}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label>Vị trí:</label>
      //       <input
      //         type="text"
      //         placeholder="Nhập vị trí máy in"
      //         value={printerLocation}
      //         onChange={(e) => setPrinterLocation(e.target.value)}
      //       />
      //     </div>
      //   </div>
      // </div>

      // <div className="button-group">
      //   <Link to="/printers">
      //     <button className="button cancel">Hủy</button>
      //   </Link>
      //   <button className="button save" onClick={handleSavePrinter}>
      //     Lưu
      //   </button>
      // </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../Axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function AddPrinter() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  const currentDateTime = new Date(); 
  const hours = currentDateTime.getHours(); 
  const period = hours < 12 ? "SA" : "CH"; // Xác định SA hoặc CH 
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Chuyển đổi 24h thành 12h 
  const formattedDate = `${String(currentDateTime.getDate()).padStart(2, '0')}/${String(currentDateTime.getMonth() + 1).padStart(2, '0')}/${currentDateTime.getFullYear()} ${String(formattedHours).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')} ${period}`;
  const [values, setValues] = useState({
      name: '',
      ip: '',
      location: '',
      status: "D",
      lastUsed: formattedDate,
      condition: '',
      description: ''
  })
  // const [file, setFile] = useState(null);
  // const handleFileChange = (e) => { 
  //   setFile(e.target.files[0]); 
  // };

  const [id,setID] = useState('');
  const handleSubmit = async (event) => {
      event.preventDefault();
      handleClose()
      // const formData = new FormData(); 
      // formData.append('image', file); 
      // formData.append('name', values.name); 
      // formData.append('ip', values.ip); 
      // formData.append('location', values.location); 
      // formData.append('status', values.status); 
      // formData.append('lastUsed', values.lastUsed); 
      // formData.append('condition', values.condition); 
      // formData.append('description', values.description);
      try {
          const res = await AxiosInstance.post(`printers/`, values);
          //console.log(res);
          if (res.status === 201) {
              setID(res.data.id)
              handleShow2()
              //toast.success('Đã thêm máy in thành công!');
              setValues({
                name: '',
                ip: '',
                location: '',
                status: "D",
                lastUsed: '',
                condition: '',
                description: ''
              });
          } else if (res.status === 400) {
              toast.error('Hãy điền đủ các trường!');
          } else {
              toast.error('Lỗi!');
          }
      } catch (error) {
          console.error(error);
          toast.error(`${error}, Lỗi!`);
      }
  }

  const navigate = useNavigate();
  const handleBackButton = () => {
      navigate(-1);
  }
  
  return (
    <StyledPrinterList>
      <StyledHeader>
        <Title>Thêm máy in</Title>
        <>
          <button type="button" className="btn btn-light" onClick={handleBackButton}>
            <i className="bi bi-x-lg"></i> Hủy
          </button>
        </>
      </StyledHeader>
      <hr />
      <div className="mx-5" style={{}}>
        <div class="was-validated">
          <div className="row">
            <div className="col-5">
              <div className="input-file-wrapper">
                <label>Ảnh:</label>
                <input type="file" accept="image/*"/>
              </div>
              <div className="">
                <label style={{ fontWeight: 'bold' }} htmlFor="statusid" class = "dh">Kích hoạt : </label>
                <div className="form-check form-switch ms-2">
                    < input className="form-check-input" required  type="checkbox" role="switch" id="statusid" checked={values.status==="E"} onClick={e => setValues({ ...values, status: values.status==="E"?"D":"E", condition: values.status==="E"?"U":"R" })} readOnly />
                </div>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5">
              <label style={{ fontWeight: 'bold' }} htmlFor="nameid">Tên:</label>
              <input type="text"  required  className="form-control" id="nameid" placeholder="Nhập tên máy in" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
              <div class="invalid-feedback">Vui lòng nhập tên máy in </div>
                     
              <label style={{ fontWeight: 'bold' }} htmlFor="ipid">Địa chỉ IP:</label>
              <input type="text" className="form-control"  required  id="ipid" placeholder="Nhập ip máy in" value={values.ip} onChange={e => setValues({ ...values, ip: e.target.value })} />
              <div class="invalid-feedback">Vui lòng nhập ip của máy in </div>
              <div className="">
                <label style={{ fontWeight: 'bold' }} htmlFor="positionid">Vị trí:</label>
                  <select className="form-control" required id="positionid" value={values.location} onChange={(event) => setValues({ ...values, location: event.target.value })}>
                    <option value="" disabled>Chọn vị trí</option>
                    <option value="B1.203">B1.203</option>
                    <option value="H6.501">H6.501</option>
                    <option value="A4.402">A4.402</option>
                  </select>
                  <div class="invalid-feedback">Vui lòng chọn vị trí </div>
              </div>
              <div className="">
                <label style={{ fontWeight: 'bold' }} htmlFor="descriptionid">Mô tả:</label>
                <textarea style={{ height: 100 }}  required  id="descriptionid" type="text" className="form-control" placeholder="Nhập mô tả chi tiết" value={values.description} onChange={e => setValues({ ...values, description: e.target.value })} />
                <div class="invalid-feedback">Vui lòng nhập mô tả </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 col-3 mx-auto pt-5 pb-5">
            <button
              className=" btn btn-success"
              //onClick={() => setDeleteItem(d.id)} 
              onClick={handleShow}
            >Lưu</button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn có chắc chắn muốn thêm máy in này không?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={handleSubmit}>Xác nhận</Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={show2}
              onHide={handleClose2}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Đã thêm thành công!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn muốn tiếp tục thêm máy in hay xem thông tin chi tiết của máy vừa được thêm?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>Tiếp tục</Button>
                <Link to={`/printers/info/${id}`} className="btn btn-primary"  onClick={handleClose2}>Đi đến thông tin chi tiết</Link>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </StyledPrinterList>
  );
};
  
const StyledPrinterList = styled.section`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px 0px 24px;
`;

const Title = styled.h2`
  color: #242222;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
`;