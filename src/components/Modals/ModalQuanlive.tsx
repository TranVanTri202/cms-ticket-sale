import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";

import { CalendarDateValue } from "../Calendar/CalenderAddticket";

interface ModalQuanliveProps {
  visible: boolean;
  onClose: () => void;
  onFilter: (filterValue: string[], portValue: string[]) => void;
  filterDate: (beginDate:string | null, endDate:string | null) => void;
}

const ModalQuanlive: React.FC<ModalQuanliveProps> = ({
  visible,
  onClose,
  onFilter,
  filterDate,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Tất cả"]);
  const [selectedPorts, setSelectedPorts] = useState<string[]>(["Tất cả"]);
  const [beginDate, setBeginDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>("")
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;

    if (optionValue === "Tất cả") {
      // Nếu click vào "Tất cả", thì chọn "Tất cả" và xóa hết các lựa chọn khác
      setSelectedOptions(["Tất cả"]);
    } else {
      setSelectedOptions((prevOptions) => {
        // Kiểm tra giá trị đã chọn có trong mảng không
        const isSelected = prevOptions.includes(optionValue);
        if (isSelected) {
          // Nếu đã chọn thì lọc bỏ giá trị đó khỏi mảng
          return prevOptions.filter((option) => option !== optionValue);
        } else {
          // Nếu chưa chọn thì thêm giá trị vào mảng
          // Đồng thời, kiểm tra nếu "Tất cả" có trong mảng thì cũng xóa nó đi
          return prevOptions
            .filter((option) => option !== "Tất cả")
            .concat(optionValue);
        }
      });
    }
  };

  const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const portValue = event.target.value;
    const isChecked = event.target.checked;

    if (portValue === "Tất cả") {
      // Nếu click vào "Tất cả", thì chọn "Tất cả" và xóa hết các cổng khác
      setSelectedPorts(isChecked ? ["Tất cả"] : []);
    } else {
      setSelectedPorts((prevPorts) => {
        // Nếu "Tất cả" có trong danh sách cổng đã chọn thì loại bỏ nó
        const updatedPorts = prevPorts.includes("Tất cả")
          ? prevPorts.filter((port) => port !== "Tất cả")
          : prevPorts;

        if (isChecked) {
          // Nếu checkbox được chọn, thêm cổng vào danh sách
          return [...updatedPorts, portValue];
        } else {
          // Nếu checkbox bị bỏ chọn, loại bỏ cổng ra khỏi danh sách
          return updatedPorts.filter((port) => port !== portValue);
        }
      });
    }
  };

  const handleFilterSubmit = () => {
    onFilter(selectedOptions, selectedPorts);
    filterDate(beginDate, endDate)
    onClose();
  };

  return (
    <div>
      <Modal centered open={visible} onCancel={onClose} footer={null}>
        <div className="modal-locve">
          <span className="text-center heading-locve">Lọc vé</span>
          <div className="tungay-denngay">
            <div className="tungay">
              <span>Từ ngày</span> <br />
              <CalendarDateValue onDateChange={setBeginDate} />
            </div>
            <div className="denngay">
              <span>Đến ngày</span>
              <br />
              <CalendarDateValue onDateChange={setEndDate} />
            </div>
          </div>
          <span className="tinhtrangsudung">Tình trạng sử dụng</span>
          <div className="radio-tinhtrang">
            <div className="tinhtrang-tatca radio-all">
              <input
                type="checkbox"
                name="tinhtrang"
                id="tatca"
                value="Tất cả"
                checked={selectedOptions.includes("Tất cả")}
                onChange={handleOptionChange}
              />
              <label htmlFor="tatca">Tất cả</label>
            </div>
            <div className="tinhtrang-tatca  radio-all">
              <input
                type="checkbox"
                name="tinhtrang"
                id="dasudung"
                value="Đã sử dụng"
                checked={selectedOptions.includes("Đã sử dụng")}
                onChange={handleOptionChange}
              />
              <label htmlFor="dasudung">Đã sử dụng</label>
            </div>
            <div className="tinhtrang-tatca  radio-all">
              <input
                type="checkbox"
                name="tinhtrang"
                id="chuasudung"
                value="Chưa sử dụng"
                checked={selectedOptions.includes("Chưa sử dụng")}
                onChange={handleOptionChange}
              />
              <label htmlFor="chuasudung">Chưa sử dụng</label>
            </div>
            <div className="tinhtrang-tatca  radio-all">
              <input
                type="checkbox"
                name="tinhtrang"
                id="hethan"
                value="Hết hạn"
                checked={selectedOptions.includes("Hết hạn")}
                onChange={handleOptionChange}
              />
              <label htmlFor="hethan">Hết hạn</label>
            </div>
          </div>
          <span className="tinhtrangsudung">Cổng Check-in</span>
          <div className="port-list">
            <div className="port-item">
              <input
                type="checkbox"
                id="portall"
                value="Tất cả"
                checked={selectedPorts.includes("Tất cả")}
                onChange={handlePortChange}
              />
              <label htmlFor="portall">Tất cả</label>
            </div>
            <div className="port-item">
              <input
                type="checkbox"
                id="port1"
                value="Cổng 1"
                checked={selectedPorts.includes("Cổng 1")}
                onChange={handlePortChange}
              />
              <label htmlFor="port1">Cổng 1</label>
            </div>
            <div className="port-item">
              <input
                type="checkbox"
                id="port2"
                value="Cổng 2"
                checked={selectedPorts.includes("Cổng 2")}
                onChange={handlePortChange}
              />
              <label htmlFor="port2">Cổng 2</label>
            </div>
            <div className="port-item">
              <input
                type="checkbox"
                id="port3"
                value="Cổng 3"
                checked={selectedPorts.includes("Cổng 3")}
                onChange={handlePortChange}
              />
              <label htmlFor="port3">Cổng 3</label>
            </div>
            <div className="port-item">
              <input
                type="checkbox"
                id="port4"
                value="Cổng 4"
                checked={selectedPorts.includes("Cổng 4")}
                onChange={handlePortChange}
              />
              <label htmlFor="port4">Cổng 4</label>
            </div>
            <div className="port-item">
              <input
                type="checkbox"
                id="port5"
                value="Cổng 5"
                checked={selectedPorts.includes("Cổng 5")}
                onChange={handlePortChange}
              />
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
