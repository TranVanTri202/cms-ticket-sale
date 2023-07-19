import Modal from "antd/lib/modal/Modal";
import { CalendarDate, CalendarTime } from "../Calendar/Calendar";
import { addDoc, collection } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";
import { useState } from "react";

interface ModalGoidichvuProps {
  visible: boolean;
  onClose: () => void;
}

const ModalGoidichvu: React.FC<ModalGoidichvuProps> = ({ visible, onClose }) => {
  const [tenGoiVe, setTenGoiVe] = useState("");
  const [ngayapdung, setNgayApDung] = useState<string>("");
  const [ngayhethan, setNgayHetHan] = useState<string>("");
  const [giavele, setGiaVeLe] = useState("");
  const [giavecombo, setGiaComboVe1] = useState("");
  const [sogoi, setSogoi] = useState("");
  const [tinhtrang, setTinhTrang] = useState("Đang áp dụng");

  const handleSave = async () => {
    try {
      await addDoc(collection(apiFirebase, "eventpackage"), {
        tengoi: tenGoiVe,
        ngayapdung,
        ngayhethan,
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
          <span>Tên gói vé</span> <span style={{ color: "#FD5959" }}>*</span> <br />
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
              <CalendarDate  />
              <CalendarTime />
            </div>
          </div>
          <div className="ngayhethan">
            <span>Ngày hết hạn</span>
            <div className="input-dateandtime" style={{ display: "flex" }}>
              <CalendarDate  />
              <CalendarTime />
            </div>
          </div>
        </div>
        <p>Giá vé áp dụng</p>
        <div className="giaveapdung">
          <div className="formgiave">
            <input type="checkbox" />
            <span>Vé lẻ (vnđ/vé) với giá </span>
            <input
              type="number"
              value={giavele}
              onChange={(e) => setGiaVeLe(e.target.value)}
              placeholder="Giá vé"
            />
            <span>/ vé</span>
          </div>
          <div className="formgiave">
            <input type="checkbox" />
            <span>Combo vé với giá </span>
            <input
              type="number"
              value={giavecombo}
              onChange={(e) => setGiaComboVe1(e.target.value)}
              placeholder="Giá vé"
            />
            <span> / </span>
            <input
              type="number"
              value={sogoi}
              onChange={(e) => setSogoi(e.target.value)}
              placeholder="Giá vé"
              style={{ width: "70px" }}
            />
            <span> vé</span>
          </div>
        </div>
        <p>Tình trạng</p>
        <select value={tinhtrang} onChange={(e) => setTinhTrang(e.target.value)}>
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
