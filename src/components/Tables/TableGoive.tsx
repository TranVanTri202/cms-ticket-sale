import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import apiFirebase from "../../firebase/apiFirebase";

interface packageData {
  id: string;
  giavecombo: number;
  giavele: number;
  magoi: string;
  sogoi: number;
  ngayapdung: string;
  ngayhethan: string;
  tengoi: string;
  thoigianapdung: string;
  thoigianhethan: string;
  tinhtrang: string;
}
interface tableProps {
  openModalEdit: () => void;
}
const TableGoive: React.FC<tableProps> = ({ openModalEdit }) => {
  const formatNumberWithDots = (value: number)  => {
    return value.toLocaleString("vi-VN")
  };
  const [data, setData] = useState<packageData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(apiFirebase, "eventpackage")
      );
      const fetchedData: packageData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as packageData);
      });
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div className="tableshow">
      <table className="table tablequanlive">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã gói</th>
            <th>Tên gói vé</th>
            <th>Ngày áp dụng</th>
            <th>Ngày hết hạn</th>
            <th>Giá vé (VNĐ/Vé)</th>
            <th>Giá Combo (VNĐ/Combo)</th>
            <th>Tình trạng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            let magoi1 = item.ngayapdung.split("/")
           let maGoi2 ="ALT" +  magoi1.join("")
            
            let spanStyle = {};
            if (item.tinhtrang === "Tắt") {
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
            } else if (item.tinhtrang === "Đang áp dụng") {
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
              <tr key={index}>
                <td style={tdstyle}>{index + 1}</td>
                <td style={tdstyle}>{maGoi2}</td>
                <td style={tdstyle}>{item.tengoi}</td>
                <td style={tdstyle}>
                  {item.ngayapdung} <br /> {item.thoigianapdung}
                </td>
                <td style={tdstyle}>{item.ngayhethan} <br /> {item.thoigianhethan}</td>
                <td style={tdstyle}>{formatNumberWithDots(item.giavele)} VNĐ</td>
                <td style={tdstyle}>{formatNumberWithDots(item.giavecombo)}VNĐ/{item.sogoi}vé </td>
                <td style={tdstyle}>
                  <span className="hansudung" style={spanStyle}>
                    <i className="bi bi-circle-fill"></i>
                    <span>{item.tinhtrang}</span>
                  </span>
                </td>
                <td style={tdstyle}>
                  <i
                    style={{ color: "#FF993C", cursor: "pointer" }}
                    onClick={openModalEdit}
                    className="bi bi-pencil-square me-2"
                  >
                    Cập nhật
                  </i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableGoive;
