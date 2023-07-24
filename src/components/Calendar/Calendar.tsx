import React, { useEffect, useState } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY"];

interface CalendarDateProps {
  onDateChange: (date: string) => void; // Thêm prop onDateChange và định nghĩa kiểu của nó
}
interface CalenderTimeProps {
  onTimechane: (date: string) => void;
}

export const CalendarDateValue: React.FC<CalendarDateProps> = ({
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    onDateChange(date ? date.format("DD/MM/YYYY") : null);
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

export const CalendarTime: React.FC<CalenderTimeProps> = ({ onTimechane }) => {
  const handleTimeChange = (time: any, timeString: string) => {
    console.log("HH:mm:ss", timeString);
    onTimechane(timeString);
  };
  return (
    <Space style={{ margin: "0" }}>
      <TimePicker
        className="custom-timepicker"
        placeholder="HH:mm:ss"
        onChange={handleTimeChange}
        format="HH:mm:ss"
      />
    </Space>
  );
};

interface CalenderValue {
  dateValue: dayjs.Dayjs | null;
  onDateChange: (date: string) => void;
}

export const CalendarDatevl: React.FC<CalenderValue> = ({
  dateValue,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dateValue);

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
