import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import apiFirebase from "../../firebase/apiFirebase";
import { Pagination } from "antd";
import Modaledit from "../Modals/Modaledit";

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
  modalVi: boolean;
}

const TableGoive: React.FC<tableProps> = ({ modalVi }) => {
  const [inMagoi, setMagoi] = useState<string>("");
  const [inTengoi, setTengoi] = useState<string>("");
  const [inThoigianApdung, setThoigianapdung] = useState<string>("");
  const [inThoigianhethan, setThoigianhethan] = useState<string>("");
  const [inngayapdung, setNgayapdung] = useState<string | null>("")
  const [inngayhethan, setNgayhethan] = useState<string | null>("");
  const [inGiavecombo, setGiavecombo] = useState<number>(0);
  const [inGiavele, setGiavele] = useState<number | null>(0);
  const [inSogoi, setSogoi] = useState<number | null>(0);
  const [inTinhtrang, setTinhtrang] = useState<string>("");
  const [inIDmagoi, setIdmagoi] = useState<string>("");
  
  const formatNumberWithDots = (value: number | null) => {
    return value ? value.toLocaleString("vi-VN") : "";
  };
  const [modalEditVisible, setModalEditVisible] = useState<boolean>(false);

  const closeModaledit = () => {
    setModalEditVisible(false);
    setMagoi("");
    setTengoi("");
    setGiavele(null);
    setSogoi(null);
    setTinhtrang("");
  };

  const openModalEdit = (
    magoi: string,
    tengoi: string,
    giavecombo: number,
    giavele: number,
    sogoi: number,
    tinhtrang: string, 
    ngayapdung:string,
    ngayhethan:string,
    thoigianapdung:string, 
    thoigianhethan:string,
    id:string,
  ) => {
    setModalEditVisible(true);
    setMagoi(magoi);
    setTengoi(tengoi);
    setGiavecombo(giavecombo);
    setGiavele(giavele);
    setSogoi(sogoi);
    setTinhtrang(tinhtrang);
    setNgayapdung(ngayapdung)
    setNgayhethan(ngayhethan)
    setThoigianapdung(thoigianapdung);
    setThoigianhethan(thoigianhethan)
    setIdmagoi(id);
    
  };
  const [data, setData] = useState<packageData[]>([]);

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
  useEffect(() => {
    fetchData();
  }, [modalVi, modalEditVisible]);

  // State để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Số hàng hiển thị trên mỗi trang
  const rowsPerPage = 6;
  const [stt, setStt] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newStt = (page - 1) * rowsPerPage + 1;
    setStt(newStt);
  };

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
          {data
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((item, index) => {
              let magoi1 = item.ngayapdung.split("/");
              let maGoi2 = "ALT" + magoi1.join("");
              let spanStyle = "";
              if (item.tinhtrang === "Tắt") {
                spanStyle = "tat";
              } else if (item.tinhtrang === "Đang áp dụng") {
                spanStyle = "dangapdung";
              }
              let tdClass = "";
              if (index % 2 === 1) {
                tdClass = "fill";
              } else {
                tdClass = "nofill";
              }
              return (
                <tr key={index}>
                  <td className={tdClass}>{stt + index}</td>
                  <td className={tdClass}>{maGoi2}</td>
                  <td className={tdClass}>{item.tengoi}</td>
                  <td className={tdClass}>
                    {item.ngayapdung} <br /> {item.thoigianapdung}
                  </td>
                  <td className={tdClass}>
                    {item.ngayhethan} <br /> {item.thoigianhethan}
                  </td>
                  <td className={tdClass}>
                    {formatNumberWithDots(item.giavele)} VNĐ
                  </td>
                  <td className={tdClass}>
                    {formatNumberWithDots(item.giavecombo)} VNĐ/{item.sogoi} vé
                  </td>
                  <td className={tdClass}>
                    <span className={spanStyle}>
                      <i className="bi bi-circle-fill"></i>
                      <span>{item.tinhtrang}</span>
                    </span>
                  </td>
                  <td className={tdClass}>
                    <i
                      style={{ color: "#FF993C", cursor: "pointer" }}
                      onClick={() =>
                        openModalEdit(
                          maGoi2,
                          item.tengoi,
                          item.giavecombo,
                          item.giavele,
                          item.sogoi,
                          item.tinhtrang,
                          item.ngayapdung, 
                          item.ngayhethan, 
                          item.thoigianapdung,
                          item.thoigianhethan,
                          item.id,
                        )
                      }
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

      {/* Hiển thị Pagination */}
      <Pagination
        current={currentPage}
        pageSize={rowsPerPage}
        total={data.length}
        onChange={handlePageChange}
      />
      <Modaledit
        visibleedit={modalEditVisible}
        onClose={closeModaledit}
        magoi={inMagoi}
        tengoi={inTengoi}
        giavecombo={inGiavecombo}
        giavele={inGiavele}
        sogoi={inSogoi}
        tinhtrang={inTinhtrang}
        ngayapdung={inngayapdung}
        ngayhethan={inngayhethan}
        thoigianapdung={inThoigianApdung}
        thoigianhethan={inThoigianhethan}
        idmagoi={inIDmagoi}
      />
    </div>
  );
};

export default TableGoive;
