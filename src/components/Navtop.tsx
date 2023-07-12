import avatar from "../asset/image/avatar.png";
const Navtop = () => {
  return (
    <div>
      <div className="navtop">
        <div className="search-container">
          <input type="text" placeholder="Search" className="inputseach" />
          <i className="bi bi-search"></i>
        </div>
        <div className="notify">
          <i className="bi bi-envelope"></i>
          <i className="bi bi-bell"></i>
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navtop;
