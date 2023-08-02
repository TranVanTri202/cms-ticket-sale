import { Modal } from "antd";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import apiFirebase from "../../firebase/apiFirebase";
import { doc, updateDoc, collection } from "firebase/firestore";
import { CalendarDateValue } from "../Calendar/CalenderUpdate";

interface ModalProps {
  visible: boolean;
  onclose: () => void;
  valueNgayhethan: string | null;
  idngayhethan: string;
  inSove: string;
  defaulModal: string | null;
}

const ModalDoingaysudung: React.FC<ModalProps> = ({
  visible,
  onclose,
  valueNgayhethan,
  idngayhethan,
  inSove,
  defaulModal,
}) => {
  const [ngayhethann, setNgayHetHan] = useState<dayjs.Dayjs | null>(null);
  // Gán ngayhethan cho dateObject nếu ngayhethan khác null
  const handleChangeNgayhethan = (date: any) => {
    setNgayHetHan(date);
  };
  useEffect(() => {
    setNgayHetHan(dayjs(valueNgayhethan, "DD/MM/YYYY"));
  }, [valueNgayhethan]);

  const handlesave = async () => {
    try {
      // Cập nhật ngày hết hạn mới vào Firebase
      if (ngayhethann) {
        const docRef = doc(
          collection(
            apiFirebase,
            defaulModal === "event" ? "ticketEvent" : "ticket"
          ),
          idngayhethan
        );
        await updateDoc(docRef, {
          [defaulModal === "event" ? "ngayhethan" : "ngaysudung"]:
            ngayhethann.format("DD/MM/YYYY"),
        });
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
              <span>Loại vé</span>
            </div>
            <div className="col-md-8">
              <span>
                {defaulModal === "event"
                  ? "Vé cổng - Gói sự kiện"
                  : "Vé cổng - Gói gia đình"}{" "}
              </span>
            </div>
          </div>
          {defaulModal === "event" ? (
            <div className="row mt-3">
              <div className="col-md-4">
                <span>Tên sự kiện</span>
              </div>
              <div className="col-md-8">
                <span>Hội triển lãm tiêu dùng 2021</span>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="row mt-3">
            <div className="col-md-4">
              <span>
                {defaulModal === "event" ? "Hạn sử dụng" : "Ngày sử dụng"}{" "}
              </span>
            </div>
            <div className="col-md-8">
              <CalendarDateValue
                dateValue={ngayhethann}
                onDateChange={handleChangeNgayhethan}
              />
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
