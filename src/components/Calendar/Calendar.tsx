import React, { useEffect, useState } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY"];



interface CalendarValue {
  dateValue: dayjs.Dayjs | null;
  onDateChange: (date: any) => void;
}

export const CalendarDatevl: React.FC<CalendarValue> = ({ dateValue, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  // Đặt giá trị ban đầu cho selectedDate khi component mount hoặc khi dateValue prop thay đổi
  useEffect(() => {
    setSelectedDate(dateValue);
  }, [dateValue]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <Space direction="vertical" size={12} style={{ margin: "0" }}>
      <DatePicker
        value={selectedDate}
        format="DD/MM/YYYY"
        className="custom-datepicker"
        onChange={handleDateChange}
      />
    </Space>
  );
};




//Lich không lấy dữ liệu
export const CalendarDate: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <Space direction="vertical" size={12} style={{ margin: "0" }}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        format={dateFormatList}
        className="custom-datepicker"
      />
    </Space>
  );
};
