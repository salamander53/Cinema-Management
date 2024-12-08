
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AxiosInstance from "../Axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddPrinter() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  const { id } = useParams();
  const [values, setValues] = useState({
      name: '',
      ip: '',
      location: '',
      status: "D",
      lastUsed: '',
      condition: '',
      description: ''
  })
  useEffect(() => {
    AxiosInstance.get(`printers/${id}/`)
      .then(res => {
          setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [])
  const handleSubmit = async (event) => {
      event.preventDefault();
      handleClose()
      try {
          const res = await AxiosInstance.put(`printers/${id}/`, values);
          console.log(res);
          if (res.status === 200) {
              handleShow2()
              //toast.success('Added Success');
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
        <Title>Chỉnh sửa thông tin</Title>
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
                <input type="file" accept="image/*" />
              </div>
              <div className="">
                <label style={{ fontWeight: 'bold' }} htmlFor="statusid"></label>
                <div className="form-check form-switch ms-2">
                    < input className="form-check-input" type="checkbox" required  role="switch" id="statusid" checked={values.status==="E"} onClick={e => setValues({ ...values, status: values.status==="E"?"D":"E" })} readOnly />
                          
               
                </div>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5">
              <div>
              <label style={{ fontWeight: 'bold' }} htmlFor="nameid">Tên:</label>
              <input type="text" className="form-control" id="nameid" required placeholder="Nhập tên máy in" value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} />
              <div class="invalid-feedback" >
                       Vui lòng nhập tên máy in 
               </div>
              </div>

                <div>


              <label style={{ fontWeight: 'bold' }} htmlFor="ipid">Địa chỉ IP:</label>
              <input type="text" className="form-control" id="ipid" required placeholder="Nhập ip máy in" value={values.ip} onChange={e => setValues({ ...values, ip: e.target.value })} />
              <div class="invalid-feedback">
                       Vui lòng nhập IP máy in 
               </div>  
                </div>


              <div className="">
                <label style={{ fontWeight: 'bold' }} htmlFor="positionid">Vị trí:</label>
                  <select className="form-control" id="positionid" required value={values.location} onChange={(event) => setValues({ ...values, location: event.target.value })}>
                    <option value="" disabled>Chọn vị trí</option>
                    <option value="B1.203">B1.203</option>
                    <option value="H6.501">H6.501</option>
                    <option value="A4.402">A4.402</option>
                  </select>
                  <div class="invalid-feedback">
                       Vui lòng chọn vị trí 
                       </div>  
              </div>
              <div className="">
                <label style={{ fontWeight: 'bold' }} htmlFor="descriptionid">Mô tả:</label>
                <textarea style={{ height: 100 }} id="descriptionid" required type="text" className="form-control" placeholder="Nhập mô tả chi tiết" value={values.description} onChange={e => setValues({ ...values, description: e.target.value })} />
                <div class="invalid-feedback">
                       Vui lòng nhập mô tả 
                       </div>               
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 col-3 mx-auto pt-5 pb-5">
            <button 
              className=" btn btn-success"
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
                Bạn có chắc chắn muốn thay đổi thông tin không?
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
                <Modal.Title>Đã cập nhật thành công!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn muốn tiếp tục thay đổi hay xem thông tin chi tiết của máy vừa được cập nhật?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>Tiếp tục</Button>
                <Link to={`/printers/info/${id}`} className="btn btn-primary"  onClick={handleClose2} state={{ from: `/edit/${id}` }}>Đi đến thông tin chi tiết</Link>
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