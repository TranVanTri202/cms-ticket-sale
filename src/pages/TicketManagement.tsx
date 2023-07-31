import { ChangeEvent, useState } from "react";
import ModalQuanlive from "../components/Modals/ModalQuanlive";
import TableTicketFamily from "../components/Tables/TableTicketFamily";
import TableTicketEvent from "../components/Tables/TableTicketEvent";

const TicketManagement = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPorts, setSelectedPorts] = useState<string[]>([]);
  const [filter, setFilter] = useState<string[]>(["Tất cả"]);
  const [selectedTab, setSelectedTab] = useState("giaDinh");
  const [beginDate, setBeginDate] = useState<string | null>("") // Thêm state để theo dõi tab được chọn
  const [endDate, setEndDate] = useState<string | null>("")
   // Thêm state để theo dõi tab được chọn
  const handleFilterChange = (filterValue: string[], portValue: string[]) => {
    setFilter(filterValue);
    setSelectedPorts(portValue); // Nhận giá trị filter và cập nhật state filter
  };
  const handletInvalueDate = (beginDate:string | null, endDate:string| null) => {
    setBeginDate(beginDate)
    setEndDate(endDate)
  }
  const [ticketNumber, setTicketNumber] = useState<string>("");

  const valueTicket = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketNumber(e.target.value);
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
            <TableTicketFamily
              filter={filter}
              ticketNumber={ticketNumber}
              selectedPorts={selectedPorts}
              enddate={endDate}
              BeginDate={beginDate}
            />
          ) : (
            <TableTicketEvent
              filter={filter}
              ticketNumber={ticketNumber}
              selectedPorts={selectedPorts}
            />
          )}
        </div>
      </div>
      <ModalQuanlive
        visible={modalVisible}
        onClose={closeModal}
        onFilter={handleFilterChange}
        filterDate={handletInvalueDate}
      />
    </>
  );
};

export default TicketManagement;
