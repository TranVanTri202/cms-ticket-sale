import { ChangeEvent, useState } from "react";
import ModalQuanlive from "../components/Modals/ModalQuanlive";
import Tablevegiadinh from "../components/Tables/Tablevegiadinh";
import TableveSukien from "../components/Tables/TableveSukien";

const Quanlyve = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("Tất cả");
  const [selectedTab, setSelectedTab] = useState("giaDinh"); // Thêm state để theo dõi tab được chọn
  const [ticketNumber, setTicketNumber] = useState<string>("");

  const valueTicket = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketNumber(e.target.value);

  };
  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="content">
        <div className="main">
          <h3>Danh sách vé</h3>
          <div className="btnchuyendoi">
            <button
              className={selectedTab === "giaDinh" ? "active" : ""}
              onClick={() => handleTabChange("giaDinh")}
            >
              Gói gia đình
            </button>

            <button
              className={selectedTab === "suKien" ? "active" : ""}
              onClick={() => handleTabChange("suKien")}
            >
              Gói sự kiện
            </button>
          </div>

          <div className="congcutimve">
            <div className="timve">
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm bằng số vé"
                className="inputseach"
                value={ticketNumber}
                onChange={valueTicket}
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

          {selectedTab === "giaDinh" ? (
            <Tablevegiadinh filter={filter} ticketNumber={ticketNumber} />
          ) : (
            <TableveSukien filter={filter} ticketNumber={ticketNumber} />
          )}
        </div>
      </div>
      <ModalQuanlive
        visible={modalVisible}
        onClose={closeModal}
        onFilter={handleFilter}
      />
    </>
  );
};

export default Quanlyve;
