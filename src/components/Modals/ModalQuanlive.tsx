import React from "react";
import Modal from "antd/lib/modal/Modal";
import Calendar from "../Calendar/Calendar";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}
const ModalQuanlive: React.FC<CustomModalProps> = ({ visible, onClose }) => {
  return (
    <div>
      <Modal centered open={visible} onOk={onClose} onCancel={onClose}>
        <div className="modal-locve">
          <span className="text-center heading-locve">Lọc vé</span>
          <div className="tungay-denngay">
            <div className="tungay">
              <span>Từ ngày</span> <br />
              <Calendar />
            </div>
            <div className="denngay">
              <span>Đến ngày</span><br />
              <Calendar />
            </div>
          </div>
          <p>
            Tình trạng sử dụng
          </p>
          <p>s  ome contents...</p>
          <p>some contents...</p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalQuanlive;
