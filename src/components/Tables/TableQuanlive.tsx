import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";

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

interface TableQuanliveProps {
  filter: string;
}

const TableQuanlive: React.FC<TableQuanliveProps> = ({ filter }) => {
  const [data, setData] = useState<FirebaseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(apiFirebase, "ticket"));
      const fetchedData: FirebaseData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as FirebaseData);
      });
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let filteredRows: FirebaseData[];

  if (filter === "Tất cả") {
    filteredRows = data;
  } else {
    filteredRows = data.filter((item) => item.tinhtrang === filter);
  }

  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const calculateSTT = (index: number) => {
    return indexOfFirstRow + index + 1;
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <>
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
              let tdstyle = {};
              if (index % 2 === 1) {
                tdstyle = { backgroundColor: "#F7F8FB", padding: "10px" };
              } else {
                tdstyle = { padding: "10px" };
              }

              return (
                <tr key={item.STT}>
                  <td style={tdstyle}>{calculateSTT(index)}</td>
                  <td style={tdstyle}>{item.bookingcode}</td>
                  <td style={tdstyle}>{item.sove}</td>
                  <td style={tdstyle}>
                    <span className="hansudung" style={spanStyle}>
                      <i className="bi bi-circle-fill"></i>
                      <span>{item.tinhtrang}</span>
                    </span>
                  </td>
                  <td style={tdstyle}>{item.ngaysudung}</td>
                  <td style={tdstyle}>{item.ngayxuatve}</td>
                  <td style={tdstyle}>{item.congcheck}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-link btn btn-danger ${pageNumber === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
};

export default TableQuanlive;
