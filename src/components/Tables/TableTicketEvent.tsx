import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";
import ModalDoingaysudung from "../Modals/ModalDoingaysudung";
import { Pagination } from "antd";

interface FirebaseData {
  id: string;
  bookingcode: string;
  congcheck: string;
  ngaysudung: string;
  ngayhethan: string;
  sove: string;
  tinhtrang: string;
  tensukien: string;
}

interface TableQuanliveProps {
  filter: string[];
  ticketNumber: string;
  selectedPorts: string[];
}

const TableTicketEvent: React.FC<TableQuanliveProps> = ({
  filter,
  ticketNumber,
  selectedPorts,
}) => {
  const [modalNgaysudung, setModalNgaysudung] = useState(false);
  const [valueNgayhethan, setValuengayhethan] = useState<string | null>(null);
  const [str, setStr] = useState<string | null>("");
  const [idhethan, setIdngayhethan] = useState<string>("");
  const [sove, setSove] = useState<string>("");
  const openModalDoingaysudung = (
    value: string,
    id: string,
    sove: string,
    str: string
  ) => {
    setModalNgaysudung(true);
    setValuengayhethan(value || null);
    setIdngayhethan(id);
    setSove(sove);
    setStr(str);
  };

  const [data, setData] = useState<FirebaseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(apiFirebase, "ticketEvent"));
    const fetchedData: FirebaseData[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, [modalNgaysudung]);

  const closeModal = () => {
    setModalNgaysudung(false);
    setValuengayhethan(null);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let filteredRows: FirebaseData[];

  if (
    filter.includes("Tất cả") &&
    selectedPorts.length === 1 &&
    selectedPorts[0] === "Tất cả"
  ) {
    // Nếu filter và selectedPorts đều là ["Tất cả"], hiển thị toàn bộ dữ liệu
    filteredRows = data.filter(
      (item) => item.sove && item.sove.includes(ticketNumber)
    );
  } else if (filter.includes("Tất cả")) {
    // Nếu filter là "Tất cả" và selectedPorts không là "Tất cả", chỉ lọc theo selectedPorts
    filteredRows = data.filter(
      (item) =>
        item.sove &&
        item.sove.includes(ticketNumber) &&
        (selectedPorts.length === 0 || selectedPorts.includes(item.congcheck))
    );
  } else if (selectedPorts.includes("Tất cả")) {
    // Nếu filter không là "Tất cả" và selectedPorts là "Tất cả", chỉ lọc theo filter
    filteredRows = data.filter(
      (item) =>
        filter.includes(item.tinhtrang) &&
        item.sove &&
        item.sove.includes(ticketNumber)
    );
  } else {
    // Nếu filter không là "Tất cả" và selectedPorts không là "Tất cả", lọc theo cả filter và selectedPorts
    filteredRows = data.filter(
      (item) =>
        filter.includes(item.tinhtrang) &&
        item.sove &&
        item.sove.includes(ticketNumber) &&
        (selectedPorts.length === 0 || selectedPorts.includes(item.congcheck))
    );
  }

  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const calculateSTT = (index: number) => {
    return indexOfFirstRow + index + 1;
  };

  return (
    <>
      <div className="tableshow">
        <table className="table tablequanlive">
          <thead>
            <tr>
              <th>STT</th>
              <th>Booking code</th>
              <th>Số vé</th>
              <th>Tên sự kiện</th>
              <th>Tình trạng sử dụng</th>
              <th>Ngày sử dụng</th>
              <th>Hạn sử dụng</th>
              <th>Cổng check-in</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => {
              let spanStyle = {};
              if (item.tinhtrang === "Hết hạn") {
                spanStyle = {
                  border: "1px solid #FD5959",
                  backgroundColor: "#F8EBE8",
                  color: "#FD5959",
                };
              } else if (item.tinhtrang === "Đã sử dụng") {
                spanStyle = {
                  border: "1px solid #919DBA",
                  backgroundColor: "#EAF1F8",
                  color: "#919DBA",
                };
              } else if (item.tinhtrang === "Chưa sử dụng") {
                spanStyle = {
                  border: "1px solid #03AC00",
                  backgroundColor: "#DEF7E0",
                  color: "#03AC00",
                };
              }
              let tdClass = "";
              if (index % 2 === 1) {
                tdClass = "fill";
              } else {
                tdClass = "nofill";
              }
              let str = "event";
              return (
                <tr className="hov" key={index}>
                  <td className={tdClass}>{calculateSTT(index)}</td>
                  <td className={tdClass}>{item.bookingcode}</td>
                  <td className={tdClass}>{item.sove}</td>
                  <td className={tdClass}>{item.tensukien}</td>
                  <td className={tdClass}>
                    <span className="hansudung" style={spanStyle}>
                      <i className="bi bi-circle-fill"></i>
                      <span>{item.tinhtrang}</span>
                    </span>
                  </td>
                  <td className={tdClass}>{item.ngaysudung}</td>
                  <td className={tdClass}>{item.ngayhethan}</td>
                  <td className={tdClass}>{item.congcheck}</td>
                  <td className={tdClass}>
                    <i
                      onClick={() =>
                        openModalDoingaysudung(
                          item.ngayhethan,
                          item.id,
                          item.sove,
                          str
                        )
                      }
                      className="bi bi-three-dots-vertical"
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
          pageSize={rowsPerPage}
          total={filteredRows.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <ModalDoingaysudung
        valueNgayhethan={valueNgayhethan}
        onclose={closeModal}
        visible={modalNgaysudung}
        idngayhethan={idhethan}
        inSove={sove}
        defaulModal={str}
      />
    </>
  );
};

export default TableTicketEvent;
