import React from "react";
import Menuu from "./components/Layouts/Menu";
import "./css/index.css";
import Navtop from "./components/Layouts/Navtop";
import { Route, Routes } from "react-router-dom";
import Trangchu from "./pages/Trangchu";
import Quanlyve from "./pages/Quanlyve";
import Doisatve from "./pages/Doisoatve";
import Goidichvu from "./pages/Goidichvu";

function App() {
  return (
    <>
      <div className="bgbody">
        <Menuu />
        <div>
          <Navtop />
          <Routes>
            <Route path="/" element={<Trangchu />} />
            <Route path="/danhsachve" element={<Quanlyve />} />
            <Route path="/doisoatve" element={<Doisatve />} />
            <Route path="/goidichvu" element={<Goidichvu />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
