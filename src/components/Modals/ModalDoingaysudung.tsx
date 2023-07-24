import { Modal } from "antd";
import { CalendarDatevl } from "../Calendar/Calendar";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";

interface ModalProps {
  visible: boolean;
  onclose: () => void;
  valueNgayhethan: string | null;
}

const ModalDoingaysudung: React.FC<ModalProps> = ({
  visible,
  onclose,
  valueNgayhethan,
}) => {
  dayjs.extend(customParseFormat);
  const [ngayhethan, setNgayHetHan] = useState<string | null>(null);
  
  const dateFormat = "DD/MM/YYYY";
  const dateObject = dayjs(valueNgayhethan, dateFormat);
  return (
    <div className="modal-doingay">
      <Modal centered footer={null} open={visible} onCancel={onclose}>
        <div>
          <div className="title-modal">
            <h5>Đổi ngày sử dụng vé</h5>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <span>Số vé</span>
            </div>
            <div className="col-md-8">
              <span>PKG20210502</span>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <span>Vé cổng - Gói sự kiện</span>
            </div>
            <div className="col-md-8">
              <span>Vé cổng - Gói sự kiện</span>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <span>Tên sự kiện</span>
            </div>
            <div className="col-md-8">
              <span>Hội triển lãm tiêu dùng 2021</span>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <span>Hạn sử dụng</span>
            </div>
            <div className="col-md-8">
            <CalendarDatevl dateValue={dateObject} onDateChange={(date) => setNgayHetHan(date)} />

            </div>
          </div>
          <div className="btnfooter mt-4">
            <button onClick={onclose}>Hủy</button>
            <button>Lưu</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDoingaysudung;
