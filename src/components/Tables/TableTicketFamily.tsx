import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";
import ModalDoingaysudung from "../Modals/ModalDoingaysudung";
import { Pagination } from "antd";

interface FirebaseData {
  id: string;
  STT: number;
  bookingcode: string;
  congcheck: string;
  ngaysudung: string;
  ngayxuatve: string;
  sove: string;
  tinhtrang: string;
}

interface TableTicketProps {
  filter: string[];
  ticketNumber: string;
  selectedPorts: string[];
  enddate:string | null;
  BeginDate:string | null
}

const TableTicketFamily: React.FC<TableTicketProps> = ({
  filter,
  ticketNumber,
  selectedPorts,
  BeginDate,
  enddate,
}) => {
  const [data, setData] = useState<FirebaseData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 9;
  const [modalNgaysudung, setModalNgaysudung] = useState<boolean>(false);
  const [valueNgayhethan, setValuengayhethan] = useState<string | null>(null);
  const [idhethan, setIdngayhethan] = useState<string>("");
  const [soVe, setsove] = useState<string>("");
  const [str, setStr] = useState<string | null>("");

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const openModalDoingaysudung = (
    value: string,
    id: string,
    sove: string,
    str: string
  ) => {
    setModalNgaysudung(true);
    setValuengayhethan(value || null);
    setIdngayhethan(id);
    setsove(sove);
    setStr(str);
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(apiFirebase, "ticket"));
    const fetchedData: FirebaseData[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, [modalNgaysudung]);

  const closeModal = async () => {
    setModalNgaysudung(false);
    setValuengayhethan(null);
    await fetchData();
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let filteredRows: FirebaseData[];

  
  if (
    filter.includes("Tất cả") &&
    selectedPorts.length === 1 &&
    selectedPorts[0] === "Tất cả"
  ) {
    filteredRows = data.filter(
      (item) => item.sove && item.sove.includes(ticketNumber)
    );
  } else if (filter.includes("Tất cả")) {
    filteredRows = data.filter(
      (item) =>
        item.sove &&
        item.sove.includes(ticketNumber) &&
        (selectedPorts.length === 0 || selectedPorts.includes(item.congcheck))
    );
  } else if (selectedPorts.includes("Tất cả")) {
    filteredRows = data.filter(
      (item) =>
        filter.includes(item.tinhtrang) &&
        item.sove &&
        item.sove.includes(ticketNumber)
    );
  } else {
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

  // const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <React.Fragment>
      <div className="tableshow">
        <table className="table tablequanlive">
          <thead>
            <tr>
              <th>STT</th>
              <th>Booking code</th>
              <th>Số vé</th>
              <th>Tình trạng sử dụng</th>
              <th>Ngày sử dụng</th>
              <th>Ngày xuất vé</th>
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
              let str = "family";
              return (
                <tr className="hov" key={index}>
                  <td className={tdClass}>{calculateSTT(index)}</td>
                  <td className={tdClass}>{item.bookingcode}</td>
                  <td className={tdClass}>{item.sove}</td>
                  <td className={tdClass}>
                    <span className="hansudung" style={spanStyle}>
                      <i className="bi bi-circle-fill"></i>
                      <span>{item.tinhtrang}</span>
                    </span>
                  </td>
                  <td className={tdClass}>{item.ngaysudung}</td>
                  <td className={tdClass}>{item.ngayxuatve}</td>
                  <td className={tdClass}>{item.congcheck} </td>
                  <td className={tdClass}>
                    <i
                      onClick={() =>
                        openModalDoingaysudung(
                          item.ngaysudung,
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
      <div className="pagination justify-content-center">
        <Pagination
          current={currentPage}
          pageSize={rowsPerPage}
          total={filteredRows.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <ModalDoingaysudung
        onclose={closeModal}
        idngayhethan={idhethan}
        visible={modalNgaysudung}
        valueNgayhethan={valueNgayhethan}
        inSove={soVe}
        defaulModal={str}
      />
    </React.Fragment>
  );
};

export default TableTicketFamily;
