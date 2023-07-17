import { useState } from "react";
import ModalQuanlive from "../components/Modals/ModalQuanlive";
import TableQuanlive from "../components/Tables/TableQuanlive";

const Quanlyve = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("Tất cả");

  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="content">
        <div className="main">
          <h2>Danh sách vé</h2>
          <div className="congcutimve">
            <div className="timve">
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm bằng số vé"
                className="inputseach"
              />
              <i className="bi bi-search"></i>
            </div>
            <div className="locve">
              <button>Xuất file (.csv)</button>
              <button type="button" className="btnlocve" onClick={openModal}>
                <i className="bi bi-funnel"></i>Lọc vé
              </button>
            </div>
          </div>
          <TableQuanlive filter={filter} />
        </div>
      </div>
      <ModalQuanlive visible={modalVisible} onClose={closeModal} onFilter={handleFilter} />
    </>
  );
};

export default Quanlyve;
