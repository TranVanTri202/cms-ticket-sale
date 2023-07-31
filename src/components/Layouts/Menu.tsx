import { useState } from "react";
import insght from "../../asset/image/insightimg.png";
import { NavLink } from "react-router-dom";
import "../../css/Menu.css";

const Menu = () => {
  const [activeItem, setActiveItem] = useState<string>("home");
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };
  return (
    <div className="menu">
      <div className="insightlogo">
        <img src={insght} alt="" className="insightimg" />
      </div>
      <div className="frame">
        <NavLink to="/" className="nav-link">
          <li
            className={activeItem === "home" ? "active" : ""}
            onClick={() => handleItemClick("home")}
          >
            <i className="bi bi-house-door"></i> <span>Trang chủ</span>
          </li>
        </NavLink>
        <NavLink to="/TicketManagement" className="nav-link">
          <li
            className={activeItem === "ticket" ? "active" : ""}
            onClick={() => handleItemClick("ticket")}
          >
            <i className="bi bi-ticket-perforated"></i> <span>Quản lý vé</span>
          </li>
        </NavLink>
        <NavLink to="/TicketCheck" className="nav-link">
          <li
            className={activeItem === "settlement" ? "active" : ""}
            onClick={() => handleItemClick("settlement")}
          >
            <i className="bi bi-file-earmark-text"></i>
            <span>Đối soát vé</span>
          </li>
        </NavLink>
        <li className={activeItem === "setting" ? "active" : ""}>
          <i className="bi bi-gear"></i>
          <span>Cài đặt</span>
        </li>
        <NavLink to="/ServicePack" className="nav-link">
          <li onClick={() => handleItemClick("setting")}>
            <span style={{ marginLeft: "80px" }}>Gói dịch vụ</span>
          </li>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
