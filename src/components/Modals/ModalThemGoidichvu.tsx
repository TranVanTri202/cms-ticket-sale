import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Modal from "antd/lib/modal/Modal";

import { addDoc, collection } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";
import { CalendarDateValue, CalendarTime } from "../Calendar/CalenderAddticket";

dayjs.extend(customParseFormat);
interface ModalGoidichvuProps {
  visible: boolean;
  onClose: () => void;
}

const ModalGoidichvu: React.FC<ModalGoidichvuProps> = ({
  visible,
  onClose,
}) => {
  const [tenGoiVe, setTenGoiVe] = useState("");
  const [ngayapdung, setNgayApDung] = useState<string | null>(null);
  const [ngayhethan, setNgayHetHan] = useState<string | null>(null);
  const [thoigianapdung, setThoigianApdung] = useState<string | null>(null);
  const [thoigianhethan, setThoigianHethan] = useState<string | null>(null);
  const [giavele, setGiaVeLe] = useState<number | null>(null);
  const [giavecombo, setGiaComboVe1] = useState<number | null>(null);
  const [sogoi, setSogoi] = useState("");
  const [tinhtrang, setTinhTrang] = useState("Đang áp dụng");
  const [disableinput1, setDisableinput1] = useState<boolean>(false);
  const [disableinput2, setDisableinput2] = useState<boolean>(false);

  
  const handleCheckboxChange = () => {
    setDisableinput1(!disableinput1); // Đảo ngược giá trị của disableinput
  };
  const handleCheckbox2 = () => {
    setDisableinput2(!disableinput2);
  };
  const handleSave = async () => {
    try {
      const formattedNgayApDung = ngayapdung
        ? dayjs(ngayapdung).format("MM/DD/YYYY")
        : "";
      const formattedNgayHetHan = ngayhethan
        ? dayjs(ngayhethan).format("MM/DD/YYYY")
        : "";
      await addDoc(collection(apiFirebase, "eventpackage"), {
        tengoi: tenGoiVe,
        ngayapdung: formattedNgayApDung,
        ngayhethan: formattedNgayHetHan,
        thoigianapdung,
        thoigianhethan,
        giavele,
        giavecombo,
        sogoi,
        tinhtrang,
      });

      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu thông tin vào Firebase:", error);
    }
  };

  return (
    <Modal centered open={visible} onCancel={onClose} footer={null} width={630}>
      <div className="modal-themgoi">
        <span className="text-center heading-themgoive">Thêm gói vé</span>
        <div className="tengoive">
          <span>Tên gói vé</span> <span style={{ color: "#FD5959" }}>*</span>{" "}
          <br />
          <input
            className="input-tengoive"
            type="text"
            value={tenGoiVe}
            onChange={(e) => setTenGoiVe(e.target.value)}
            placeholder="Nhập tên gói vé"
          />
        </div>
        <div className="ngayapdung-ngayhethan">
          <div className="ngayapdung">
            <span>Ngày áp dụng</span>
            <div className="input-dateandtime" style={{ display: "flex" }}>
              <CalendarDateValue onDateChange={setNgayApDung} />
              <CalendarTime onTimechane={setThoigianApdung} />
            </div>
          </div>
          <div className="ngayhethan">
            <span>Ngày hết hạn</span>
            <div className="input-dateandtime" style={{ display: "flex" }}>
              <CalendarDateValue onDateChange={setNgayHetHan} />
              <CalendarTime onTimechane={setThoigianHethan} />
            </div>
          </div>
        </div>
        <p>Giá vé áp dụng</p>
        <div className="giaveapdung">
          <div className="formgiave">
            <input
              type="checkbox"
              checked={disableinput1}
              onChange={handleCheckboxChange}
            />
            <span>Vé lẻ (vnđ/vé) với giá </span>
            <input
              type="number"
              value={giavele !== null ? giavele.toString() : ""}
              onChange={(e) => setGiaVeLe(Number(e.target.value))}
              placeholder="Giá vé"
              disabled={!disableinput1}
            />
            <span>/ vé</span>
          </div>
          <div className="formgiave">
            <input
              type="checkbox"
              checked={disableinput2}
              onChange={handleCheckbox2}
            />
            <span>Combo vé với giá </span>
            <input
              type="number"
              value={giavecombo !== null ? giavecombo.toString() : ""}
              onChange={(e) => setGiaComboVe1(Number(e.target.value))}
              placeholder="Giá vé"
              disabled={!disableinput2}
            />
            <span> / </span>
            <input
              type="number"
              value={sogoi}
              onChange={(e) => setSogoi(e.target.value)}
              placeholder="Giá vé"
              style={{ width: "70px" }}
              disabled={!disableinput2}
            />
            <span> vé</span>
          </div>
        </div>
        <p>Tình trạng</p>
        <select
          value={tinhtrang}
          onChange={(e) => setTinhTrang(e.target.value)}
        >
          <option value="Đang áp dụng">Đang áp dụng</option>
          <option value="Tắt">Tắt</option>
        </select>
        <div className="lablesmall">
          <span style={{ color: "#FD5959" }}>*</span>
          <span>Là thông tin bắt buộc</span>
        </div>
        <div className="btnfooter">
          <button onClick={onClose}>Hủy</button>
          <button onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalGoidichvu;
