import React, { useEffect, useState } from "react";
import apiFirebase from "../firebase/apiFirebase";
import { collection, getDocs } from "firebase/firestore";
import { Modal } from "antd";
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

const Quanlyve = () => {
  const [data, setData] = useState<FirebaseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState<boolean>(false);
  const rowsPerPage = 9;

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Tính toán chỉ số hàng đầu và cuối trang
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Tính toán STT dựa trên trang hiện tại
  const calculateSTT = (index: number) => {
    return indexOfFirstRow + index + 1;
  };

  // Tính toán tổng số trang
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (<>
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
            <button type="button" className="btnlocve" onClick={()=>{setModal(true)}}>
              <i className="bi bi-funnel"></i>Lọc vé
            </button>
          </div>
        </div>
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
                 if(index %2 ===1){
                   tdstyle = { backgroundColor: "#F7F8FB", padding:"10px"}
                 }else{
                   tdstyle = { padding:"10px"}
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
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`page-link btn btn-danger ${
                  pageNumber === currentPage ? "active" : ""
                }` } 
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
    <Modal 
        centered
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        style={{width:"634px", height:"454"}}
      >
        <div className="modal-locve" style={{background:"#FFF"}}>
        <h3 className="text-center ">Lọc vé</h3>
        <p><input type="datetime-local" /></p>
        <p>some contents...</p>
        <p>some contents...</p>
        </div>
      </Modal>
    </>
  );
};

export default Quanlyve;
