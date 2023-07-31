import React from "react";
import Menuu from "./components/Layouts/Menu";
import "./css/index.css";
import Navtop from "./components/Layouts/Navtop";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TicketManagement from "./pages/TicketManagement";
import TicketCheck from "./pages/TicketCheck";
import ServicePack from "./pages/ServicePack";

function App() {
  return (
    <>
      <div className="bgbody">
        <Menuu />
        <div>
          <Navtop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TicketManagement" element={<TicketManagement />} />
            <Route path="/TicketCheck" element={<TicketCheck />} />
            <Route path="/ServicePack" element={<ServicePack />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
