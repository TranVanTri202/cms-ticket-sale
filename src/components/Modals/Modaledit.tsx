import Modal from "antd/lib/modal/Modal";
import { CalendarDate, CalendarTime } from "../Calendar/Calendar";
import { useState } from "react";

interface ModalGoidichvuProps {
  visibleedit: boolean;
  onClose: () => void;
}
const Modaledit: React.FC<ModalGoidichvuProps> = ({ visibleedit, onClose }) => {
  const [thoigianapdung, setThoigianApdung] = useState<string | null>(null)
  const [thoigianhethan, setThoigianHethan] = useState<string | null>(null)
  return (
    <>
      <Modal
        centered
        open={visibleedit}
        onCancel={onClose}
        footer={null}
        width={630}
      >
        <div className="modal-themgoi">
          <span className="text-center heading-themgoive">
            Cập nhật thông tin gói vé
          </span>
          <div className="tengoive" style={{display:"flex"}}>
            <div className="" style={{width:"100%"}}>
              <span>Mã sự kiện</span>{" "}
              <span style={{ color: "#FD5959" }}>*</span> <br />
              <input
                className="input-tengoive"
                type="text"
                placeholder="Nhập tên gói vé"
                style={{width:"80%"}}
              />
            </div>

            <div className="" style={{width:"100%"}}>
              <span>Tên sự kiện</span>{" "}
              <span style={{ color: "#FD5959" }}>*</span> <br />
              <input
                className="input-tengoive"
                type="text"
                placeholder="Nhập tên gói vé"
                style={{width:"100%"}}
              />
            </div>
          </div>
          <div className="ngayapdung-ngayhethan">
            <div className="ngayapdung">
              <span>Ngày áp dụng</span>
              <div className="input-dateandtime" style={{ display: "flex" }}>
                <CalendarDate  />
                <CalendarTime onTimechane={setThoigianApdung}/>
              </div>
            </div>
            <div className="ngayhethan">
              <span>Ngày hết hạn</span>
              <div className="input-dateandtime" style={{ display: "flex" }}>
                <CalendarDate />
                <CalendarTime onTimechane={setThoigianHethan} />
              </div>
            </div>
          </div>
          <p>Giá vé áp dụng </p>
          <div className="giaveapdung">
            <div className="formgiave">
              <input type="checkbox" />
              <span>Vé lẻ (vnđ/vé) với giá </span>
              <input type="number" placeholder="Giá vé" />
              <span>/ vé</span>
            </div>
            <div className="formgiave">
              <input type="checkbox" />
              <span>Combo vé với giá </span>
              <input type="number" placeholder="Giá vé" />
              <span> / </span>
              <input
                type="number"
                placeholder="Giá vé"
                style={{ width: "70px" }}
              />
              <span> vé</span>
            </div>
          </div>
          <p>Tình trạng </p>
          <select name="" id="">
            <option value="">Đang áp dụng</option>
            <option value="">Hết hạn</option>
          </select>
          <div className="lablesmall">
            <span style={{ color: "#FD5959" }}>*</span>
            <span>Là thông tin bắt buộc</span>
          </div>
          <div className="btnfooter">
            <button onClick={onClose}>Hủy</button>
            <button>Lưu</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modaledit;
