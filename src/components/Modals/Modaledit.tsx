import Modal from "antd/lib/modal/Modal";
import dayjs from "dayjs";

import { ChangeEvent, useEffect, useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import apiFirebase from "../../firebase/apiFirebase";
import {
  CalendarDateValue,
  CalendarTimeValue,
} from "../Calendar/CalenderUpdate";

interface ModalGoidichvuProps {
  visibleedit: boolean;
  onClose: () => void;
  magoi: string;
  tengoi: string;
  giavele: number | null;
  giavecombo: number | null;
  sogoi: number | null;
  tinhtrang: string;
  ngayapdung: string | null;
  ngayhethan: string | null;
  thoigianapdung: string | null;
  thoigianhethan: string | null;
  idmagoi: string;
}
const Modaledit: React.FC<ModalGoidichvuProps> = ({
  visibleedit,
  onClose,
  magoi,
  tengoi,
  giavecombo,
  giavele,
  sogoi,
  tinhtrang,
  ngayapdung,
  ngayhethan,
  thoigianapdung,
  thoigianhethan,
  idmagoi,
}) => {
  const [newMagoi, setNewmagoi] = useState<string>("");
  const [newTengoi, setNewTengoi] = useState<string>("");
  const [newGiavecombo, setNewgiaveCombo] = useState<number | null>();
  const [newGiavele, setNewgiavele] = useState<number | null>();
  const [newSogoi, setNewSogoi] = useState<number | null>();
  const [newTinhtrang, setNewTinhtrang] = useState<string>("");
  const [oldNgayhethan, setoldNgayhethan] = useState<string | null>("");
  const [oldNgayapdung, setoldNgayapdung] = useState<string | null>("");
  const [oldThoigiandung, setoldthoigianapdung] = useState<string | null>("");
  const [oldThoigianhethan, setoldthoigianhethan] = useState<string | null>("");
  const handleChangMagoi = (e: ChangeEvent<HTMLInputElement>) => {
    setNewmagoi(e.target.value);
  };
  const handleChangeTengoi = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTengoi(e.target.value);
  };
  const handleChangeGiaveCombo = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setNewgiaveCombo(newValue);
  };
  const handleChangeGiavele = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setNewgiavele(newValue);
  };
  const handleChangeSogoi = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setNewSogoi(newValue);
  };
  const handleChangeTinhtrang = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewTinhtrang(e.target.value);
  };

  const [newngayapdung, setNewngayapdung] = useState<dayjs.Dayjs | null>(
    oldNgayapdung ? dayjs(ngayapdung, "DD/MM/YYYY") : null
  );
  const datengayapdung = newngayapdung
    ? newngayapdung
    : dayjs(oldNgayapdung, "DD/MM/YYYY");

  const [newngayhethan, setNewngayhethan] = useState<dayjs.Dayjs | null>(
    oldNgayhethan ? dayjs(ngayhethan, "DD/MM/YYYY") : null
  );
  const datengayhethan = newngayhethan
    ? newngayhethan
    : dayjs(oldNgayhethan, "DD/MM/YYYY");

  const [newThoigianapdung, setNewthoigianapdung] =
    useState<dayjs.Dayjs | null>(
      oldThoigiandung ? dayjs(thoigianapdung, "HH:mm:ss") : null
    );
  const timeapdung = newThoigianapdung
    ? newThoigianapdung
    : dayjs(oldThoigiandung, "HH:mm:ss");

  const [newThoigianhethan, setNewthoigianhethan] =
    useState<dayjs.Dayjs | null>(
      oldThoigianhethan ? dayjs(thoigianhethan, "HH:mm:ss") : null
    );
  const timehethan = newThoigianhethan
    ? newThoigianhethan
    : dayjs(oldThoigianhethan, "HH:mm:ss");
    
  useEffect(() => {
    setNewmagoi(magoi);
    setNewTengoi(tengoi);
    setNewgiaveCombo(giavecombo);
    setNewgiavele(giavele);
    setNewSogoi(sogoi);
    setNewTinhtrang(tinhtrang);
    setoldNgayapdung(ngayapdung);
    setoldNgayhethan(ngayhethan);
    setoldthoigianapdung(thoigianapdung);
    setoldthoigianhethan(thoigianhethan);
  }, [
    magoi,
    tengoi,
    giavecombo,
    giavele,
    sogoi,
    tinhtrang,
    ngayapdung,
    ngayhethan,
    thoigianapdung,
    thoigianhethan,
  ]);

  const handleUpdate = async () => {
    try {
      const docRef = doc(collection(apiFirebase, "eventpackage"), idmagoi);
      await updateDoc(docRef, {
        magoi: newMagoi,
        tengoi: newTengoi,
        giavele: newGiavele,
        giavecombo: newGiavecombo,
        sogoi: newSogoi,
        tinhtrang: newTinhtrang,
        ngayapdung:
          newngayapdung === null
            ? oldNgayapdung
            : newngayapdung?.format("DD/MM/YYYY"),
        ngayhethan:
          newngayhethan === null
            ? oldNgayhethan
            : newngayhethan?.format("DD/MM/YYYY"),
        thoigianapdung: !newThoigianapdung
          ? oldThoigiandung
          : newThoigianapdung?.format("HH:mm:ss"),
        thoigianhethan: !newThoigianhethan
          ? oldThoigianhethan
          : newThoigianhethan?.format("HH:mm:ss"),
      });
      onClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
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
          <div className="tengoive" style={{ display: "flex" }}>
            <div className="" style={{ width: "100%" }}>
              <span>Mã gói</span> <span style={{ color: "#FD5959" }}>*</span>{" "}
              <br />
              <input
                className="input-tengoive"
                type="text"
                placeholder="Nhập mã vé"
                style={{ width: "80%" }}
                value={newMagoi}
                onChange={handleChangMagoi}
              />
            </div>

            <div className="" style={{ width: "100%" }}>
              <span>Tên gói vé</span>{" "}
              <span style={{ color: "#FD5959" }}>*</span> <br />
              <input
                className="input-tengoive"
                type="text"
                placeholder="Nhập tên gói vé"
                style={{ width: "100%" }}
                value={newTengoi}
                onChange={handleChangeTengoi}
              />
            </div>
          </div>
          <div className="ngayapdung-ngayhethan">
            <div className="ngayapdung">
              <span>Ngày áp dụng</span>
              <div className="input-dateandtime" style={{ display: "flex" }}>
                <CalendarDateValue
                  onDateChange={setNewngayapdung}
                  dateValue={datengayapdung}
                />
                <CalendarTimeValue
                  onTimechange={setNewthoigianapdung}
                  timeValue={timeapdung}
                />
              </div>
            </div>
            <div className="ngayhethan">
              <span>Ngày hết hạn</span>
              <div className="input-dateandtime" style={{ display: "flex" }}>
                <CalendarDateValue
                  onDateChange={setNewngayhethan}
                  dateValue={datengayhethan}
                />
                <CalendarTimeValue
                  onTimechange={setNewthoigianhethan}
                  timeValue={timehethan}
                />
              </div>
            </div>
          </div>
          <p>Giá vé áp dụng </p>
          <div className="giaveapdung">
            <div className="formgiave">
              <input defaultChecked type="checkbox" />
              <span>Vé lẻ (vnđ/vé) với giá </span>
              <input
                type="number"
                placeholder="Giá vé"
                value={newGiavele ? newGiavele : ""}
                onChange={handleChangeGiavele}
              />
              <span>/ vé</span>
            </div>
            <div className="formgiave">
              <input defaultChecked type="checkbox" />
              <span>Combo vé với giá </span>
              <input
                type="number"
                placeholder="Giá vé"
                value={newGiavecombo ? newGiavecombo : ""}
                onChange={handleChangeGiaveCombo}
              />
              <span> / </span>
              <input
                type="number"
                placeholder="Giá vé"
                style={{ width: "70px" }}
                value={newSogoi ? newSogoi : ""}
                onChange={handleChangeSogoi}
              />
              <span> vé</span>
            </div>
          </div>
          <p>Tình trạng </p>
          <select
            name=""
            id=""
            value={newTinhtrang}
            onChange={handleChangeTinhtrang}
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
            <button onClick={handleUpdate}>Lưu</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Modaledit;
