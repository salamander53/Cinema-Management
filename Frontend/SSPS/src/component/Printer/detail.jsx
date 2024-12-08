// pages/theaters.js
import React from 'react';
// import { Eye, Pencil } from 'react-bootstrap-icons';

const Theaters = () => {
  const theaters = [
    { name: 'Rạp Phim A', address: '123 Đường A', manager: 'Nguyễn Văn A' },
    { name: 'Rạp Phim B', address: '456 Đường B', manager: 'Trần Văn B' },
    { name: 'Rạp Phim C', address: '789 Đường C', manager: 'Lê Thị C' },
  ];

//   const handleViewDetail = (theater) => {
//     console.log('Viewing details for:', theater);
//     // Thay thế bằng đường dẫn đến trang chi tiết của rạp phim
//     // window.location.href = `/Users/voduyhieu/Documents/database/BTL_DATABASE/Frontend/SSPS/src/component/Printer/detail.jsx`;
//   };

//   const handleEdit = (theater) => {
//     console.log('Editing:', theater);
//     // Thay thế bằng đường dẫn đến trang chỉnh sửa của rạp phim
//     // window.location.href = `/Users/voduyhieu/Documents/database/BTL_DATABASE/Frontend/SSPS/src/component/Printer/edit.jsx`;
//   };

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Theaters;
