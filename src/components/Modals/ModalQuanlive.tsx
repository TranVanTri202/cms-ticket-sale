import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { CalendarDate } from "../Calendar/Calendar";

interface ModalQuanliveProps {
  visible: boolean;
  onClose: () => void;
  onFilter: (filterValue: string) => void;
}

const ModalQuanlive: React.FC<ModalQuanliveProps> = ({
  visible,
  onClose,
  onFilter,
}) => {
  const [selectedOption, setSelectedOption] = useState("Tất cả");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleFilterSubmit = () => {
    onFilter(selectedOption);
    onClose();
  };

  return (
    <div>
      <Modal
        centered
        open={visible}
        onOk={handleFilterSubmit}
        onCancel={onClose}
        footer={null}
      >
        <div className="modal-locve">
          <span className="text-center heading-locve">Lọc vé</span>
          <div className="tungay-denngay">
            <div className="tungay">
              <span>Từ ngày</span> <br />
              <CalendarDate />
            </div>
            <div className="denngay">
              <span>Đến ngày</span>
              <br />
              <CalendarDate />
            </div>
          </div>
          <span className="tinhtrangsudung">Tình trạng sử dụng</span>
          <div className="radio-tinhtrang">
            <div className="tinhtrang-tatca radio-all">
              <input
                type="radio"
                id="tatca"
                value="Tất cả"
                checked={selectedOption === "Tất cả"}
                onChange={handleOptionChange}
              />
              <label htmlFor="tatca">Tất cả</label>
            </div>
            <div className="tinhtrang-tatca  radio-all">
              <input
                type="radio"
                id="dasudung"
                value="Đã sử dụng"
                checked={selectedOption === "Đã sử dụng"}
                onChange={handleOptionChange}
              />
              <label htmlFor="dasudung">Đã sử dụng</label>
            </div>
            <div className="tinhtrang-tatca  radio-all">
              <input
                type="radio"
                id="chuasudung"
                value="Chưa sử dụng"
                checked={selectedOption === "Chưa sử dụng"}
                onChange={handleOptionChange}
              />
              <label htmlFor="chuasudung">Chưa sử dụng</label>
            </div>
            <div className="tinhtrang-tatca  radio-all">
              <input
                type="radio"
                id="hethan"
                value="Hết hạn"
                checked={selectedOption === "Hết hạn"}
                onChange={handleOptionChange}
              />
              <label htmlFor="hethan">Hết hạn</label>
            </div>
          </div>
          <span className="tinhtrangsudung">Cổng Check-in</span>
          <div className="port-list">
            <div className="port-item">
              <input  type="checkbox" id="port6" />
              <label htmlFor="port6">Tất cả</label>
            </div>
            <div className="port-item">
              <input type="checkbox" id="port1" />
              <label htmlFor="port1">Cổng 1</label>
            </div>
            <div className="port-item">
              <input type="checkbox" id="port2" />
              <label htmlFor="port2">Cổng 2</label>
            </div>
            <div className="port-item">
              <input type="checkbox" id="port3" />
              <label htmlFor="port3">Cổng 3</label>
            </div>
            <div className="port-item">
              <input type="checkbox" id="port4" />
              <label htmlFor="port4">Cổng 4</label>
            </div>
            <div className="port-item">
              <input type="checkbox" id="port5" />
              <label htmlFor="port5">Cổng 5</label>
            </div>
          </div>
          <button className="locvemodal" onClick={handleFilterSubmit}>
            Lọc
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalQuanlive;
