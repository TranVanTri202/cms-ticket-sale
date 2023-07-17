import Modal from "antd/lib/modal/Modal";
import { CalendarDate, CalendarTime } from "../Calendar/Calendar";

interface ModalGoidichvuProps {
  visible: boolean;
  onClose: () => void;
}
const ModalGoidichvu: React.FC<ModalGoidichvuProps> = ({
  visible,
  onClose,
}) => {
  return (
    <>
      <Modal
        centered
        open={visible}
        onCancel={onClose}
        footer={null}
        width={630}
      >
        <div className="modal-themgoi">
          <span className="text-center heading-themgoive">Thêm gói vé</span>
          <div className="tengoive">
            <span>Tên gói vé</span> <span style={{ color: "#FD5959" }}>*</span>{" "}
            <br />
            <input
              className="input-tengoive"
              type="text"
              placeholder="Nhập tên gói vé"
            />
          </div>
          <div className="ngayapdung-ngayhethan">
            <div className="ngayapdung">
              <span>Ngày áp dụng</span>
              <div className="input-dateandtime" style={{ display: "flex" }}>
                <CalendarDate />
                <CalendarTime />
              </div>
            </div>
            <div className="ngayhethan">
              <span>Ngày hết hạn</span>
              <div className="input-dateandtime" style={{ display: "flex" }}>
                <CalendarDate />
                <CalendarTime />
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

export default ModalGoidichvu;
