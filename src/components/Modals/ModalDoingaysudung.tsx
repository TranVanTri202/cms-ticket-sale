import { Modal } from "antd";
import { CalendarDatevl } from "../Calendar/Calendar";

import dayjs from "dayjs";
import {  useState } from "react";
import apiFirebase from "../../firebase/apiFirebase";
import { doc, updateDoc , collection} from "firebase/firestore";

interface ModalProps {
  visible: boolean;
  onclose: () => void;
  valueNgayhethan: string | null;
  idngayhethan: string;
  inSove: string;
}

const ModalDoingaysudung: React.FC<ModalProps> = ({
  visible,
  onclose,
  valueNgayhethan,
  idngayhethan,
  inSove,
}) => {

  const [ngayhethann, setNgayHetHan] = useState<dayjs.Dayjs | null>
  (
    valueNgayhethan ? dayjs(valueNgayhethan, "DD/MM/YYYY") : null
  );
  // Gán ngayhethan cho dateObject nếu ngayhethan khác null
  const dateObject = ngayhethann ? ngayhethann : dayjs(valueNgayhethan, "DD/MM/YYYY");
   
  const handlesave = async () => {
    try {
      // Cập nhật ngày hết hạn mới vào Firebase
      if (ngayhethann) {
        const docRef = doc(collection(apiFirebase, "ticketEvent"), idngayhethan);
        await updateDoc(docRef, { ngayhethan: ngayhethann.format("DD/MM/YYYY") });
      }
  
      setNgayHetHan(null);
      onclose(); // Đóng modal sau khi lưu thành công
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
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
              <span>{inSove}</span>
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
            <CalendarDatevl dateValue={dateObject} onDateChange={setNgayHetHan} />

            </div>
          </div>
          <div className="btnfooter mt-4">
            <button onClick={onclose}>Hủy</button>
            <button onClick={handlesave}>Lưu</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDoingaysudung;
