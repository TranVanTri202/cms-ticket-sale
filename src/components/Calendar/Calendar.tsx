import React, { useState } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

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

export const CalendarTime: React.FC = () => {
  const handleTimeChange = (time: any, timeString: string) => {
    console.log("HH:mm:ss", timeString);
  };

  return (
    <Space style={{ margin: "0" }}>
      <TimePicker className="custom-timepicker" placeholder="HH:mm:ss" onChange={handleTimeChange} format="HH:mm:ss" />
    </Space>
  );
};
