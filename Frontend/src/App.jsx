import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang Login */}
        <Route path="/" element={<Login />} />

        {/* Trang Home */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
