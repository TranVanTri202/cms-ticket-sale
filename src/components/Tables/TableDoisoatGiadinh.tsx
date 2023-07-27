import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";

interface FirebaseData {
  id: string;
  congcheck: string;
  doisoat: string;
  ngaysudung: string;
  sove: string;
  tenloaive: string;
}

interface TableQuanliveProps {
  ticketNumber: string;
  onfillter: string;
  tungay: string | null;
  denngay: string | null;
}

const DoisoatGiadinh: React.FC<TableQuanliveProps> = ({
  ticketNumber,
  onfillter,
  tungay,
  denngay,
}) => {
  const [data, setData] = useState<FirebaseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;

  console.log(denngay);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(apiFirebase, "doisoatVegiadinh")
      );
      const fetchedData: FirebaseData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as FirebaseData);
      });
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const calculateSTT = (index: number) => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return indexOfFirstRow + index + 1;
  };

  const currentRows = data
    .filter((item) => {
      const isTicketNumberMatch = item.sove && item.sove.includes(ticketNumber);
      const isDoisoatMatch = onfillter === "Tất cả" || item.doisoat === onfillter;
        

      if (!tungay && !denngay) {
        // Nếu chưa chọn ngày, hiển thị toàn bộ dữ liệu
        return isTicketNumberMatch && isDoisoatMatch;
      }

      if (tungay && denngay) {
        // Xử lý lọc dữ liệu khi đã chọn ngày
        // Tách chuỗi và lấy ngày, tháng và năm từ tungay và denngay
        const fromDay = Number(tungay.split("/")[0]);
        const fromMonth = Number(tungay.split("/")[1]) - 1;
        const fromYear = Number(tungay.split("/")[2]);
        const toDay = Number(denngay.split("/")[0]);
        const toMonth = Number(denngay.split("/")[1]) - 1;
        const toYear = Number(denngay.split("/")[2]);

        // Chuyển đổi tungay và denngay thành đối tượng Date
        const fromDate = new Date(fromYear, fromMonth, fromDay);
        const toDate = new Date(toYear, toMonth, toDay);

        // Tách chuỗi và lấy ngày, tháng và năm từ ngaysudung
        const ngaySuDungDay = Number(item.ngaysudung.split("/")[0]);
        const ngaySuDungMonth = Number(item.ngaysudung.split("/")[1]) - 1;
        const ngaySuDungYear = Number(item.ngaysudung.split("/")[2]);

        // Chuyển đổi ngaysudung trong dữ liệu thành đối tượng Date
        const ngaySuDung = new Date(
          ngaySuDungYear,
          ngaySuDungMonth,
          ngaySuDungDay
        );

        // Kiểm tra xem ngaysudung có nằm trong khoảng từ tungay đến denngay không
        const isDateInRange = ngaySuDung >= fromDate && ngaySuDung <= toDate;

        return isTicketNumberMatch && isDoisoatMatch && isDateInRange;
      }

      // Một trong hai ngày được chọn, không áp dụng điều kiện lọc về ngày
      return isTicketNumberMatch && isDoisoatMatch;
    })
    .slice(currentPage - 1, currentPage + rowsPerPage - 1);

  const totalPages = Math.ceil(currentRows.length / rowsPerPage);

  return (
    <>
      <div className="tableshow">
        <table className="table tablequanlive">
          <thead>
            <tr>
              <th>STT</th>
              <th>Số vé</th>
              <th>Ngày sử dụng</th>
              <th>Tên lọai vé</th>
              <th>Cổng check-in</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => {
              let tdstyle = {};
              let doisoatStyle = {};
              if (item.doisoat === "Đã đối soát") {
                doisoatStyle = { color: "red" };
              } else {
                doisoatStyle = { color: "#A5A8B1" };
              }
              if (index % 2 === 1) {
                tdstyle = { backgroundColor: "#F7F8FB", padding: "10px" };
              } else {
                tdstyle = { padding: "10px" };
              }

              return (
                <tr key={index}>
                  <td style={tdstyle}>{calculateSTT(index)}</td>
                  <td style={tdstyle}>{item.sove}</td>
                  <td style={tdstyle}>{item.ngaysudung}</td>
                  <td style={tdstyle}>{item.tenloaive}</td>
                  <td style={tdstyle}>{item.congcheck}</td>
                  <td style={tdstyle}>
                    <i style={doisoatStyle}>{item.doisoat}</i>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`page-link btn btn-danger ${
                pageNumber === currentPage ? "active" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default DoisoatGiadinh;
