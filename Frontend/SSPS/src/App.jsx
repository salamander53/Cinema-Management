import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SideNavigation from "./component/SideNav/nav";
import Printer from "./component/Printer/printer";
import AddPrinter from "./component/Printer/add";
import EditPrinter from "./component/Printer/edit"; // Import thêm trang chỉnh sửa
import DetailPrinter from "./component/Printer/detail";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from "./component/login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./component/Dashboard/dashboard"
import Student from "./component/student"
import Config from "./component/config"
import Help from "./component/help";
import Setting from "./component/setting"

function App() {
  const location = useLocation()
  const noNavbar = location.pathname === "/"
  return (
    <>
    <ToastContainer/>
    {noNavbar ?
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    :
    <SideNavigation
      content={
        <Routes>
          <Route path="/printers" element={<Printer />} />
          <Route path="/printers/add" element={<AddPrinter />} />
          <Route path="/printers/edit/:id" element={<EditPrinter />} />
          <Route path="/printers/info/:id" element={<DetailPrinter />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/student" element={<Student/>}/>
          <Route path="/config" element={<Config/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/setting" element={<Setting/>}/>
        </Routes>
      }
    />
    }
    </>
  );
}

export default App;
