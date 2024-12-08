// pages/theaters.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, Pencil, CheckSquare } from 'react-bootstrap-icons';

const Theaters = () => {
  const theaters = [
    { name: 'Rạp Phim A', address: '123 Đường A', manager: 'Nguyễn Văn A' },
    { name: 'Rạp Phim B', address: '456 Đường B', manager: 'Trần Văn B' },
    { name: 'Rạp Phim C', address: '789 Đường C', manager: 'Lê Thị C' },
  ];

  const handleViewDetail = (theater) => {
    console.log('Viewing details for:', theater);
    // window.location.href = `/Users/voduyhieu/Documents/database/BTL_DATABASE/Frontend/SSPS/src/component/Printer/detail.jsx`;
  };

  const handleEdit = (theater) => {
    console.log('Editing:', theater);
    // window.location.href = `/Users/voduyhieu/Documents/database/BTL_DATABASE/Frontend/SSPS/src/component/Printer/edit.jsx`;
  };

  const handleSelectTheater = (theater) => {
    console.log('Selected theater:', theater);
    // Xử lý việc chọn rạp phim ở đây
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Quản lý rạp phim</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Tên rạp</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col">Người quản lý</th>
            <th scope="col">Hành động</th>
            <th scope="col">Chọn</th>
          </tr>
        </thead>
        <tbody>
          {theaters.map((theater, index) => (
            <tr key={index}>
              <td>{theater.name}</td>
              <td>{theater.address}</td>
              <td>{theater.manager}</td>
              <td>
                <button onClick={() => handleViewDetail(theater)} className="btn btn-link text-primary">
                  <Eye size={20} />
                </button>
                <button onClick={() => handleEdit(theater)} className="btn btn-link text-primary">
                  <Pencil size={20} />
                </button>
              </td>
              <td>
                <button onClick={() => handleSelectTheater(theater)} className="btn btn-link text-primary">
                  <CheckSquare size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Theaters;
