import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const cinemas = [
  { id: 1, name: "Rạp Galaxy Nguyễn Du" },
  { id: 2, name: "Rạp CGV Vincom Center" },
  { id: 3, name: "Rạp BHD Star Bitexco" },
  { id: 4, name: "Rạp Lotte Cinema Gò Vấp" },
];

const Home = () => {
  const handleManageCinema = (cinemaName) => {
    alert(`Bạn đã chọn quản lý: ${cinemaName}`);
    // Logic điều hướng đến trang quản lý rạp phim
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#FFFFE1",
        color: "#ffffff",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <header className="py-3 w-100 text-center" style={{ backgroundColor: "#0d47a1" }}>
        <h1 className="fw-bold">CinemaManagement</h1>
        <p>Chọn rạp phim mà bạn muốn quản lý</p>
      </header>

      {/* Danh sách rạp */}
      <div className="container py-4">
        <div className="row justify-content-center">
          {cinemas.map((cinema) => (
            <div
              key={cinema.id}
              className="col-12 col-md-6 col-lg-4 mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="card text-center shadow"
                style={{
                  backgroundColor: "#1e3a8a",
                  color: "#ffffff",
                  width: "90%",
                  borderRadius: "10px",
                  border: "none",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{cinema.name}</h5>
                  <p className="card-text">Quản lý chi tiết rạp này</p>
                  <button
                    className="btn btn-light fw-bold"
                    style={{
                      backgroundColor: "#5c6bc0",
                      color: "#ffffff",
                      border: "none",
                    }}
                    onClick={() => handleManageCinema(cinema.name)}
                  >
                    Quản Lý
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
