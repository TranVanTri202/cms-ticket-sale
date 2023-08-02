import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Space, TimePicker } from "antd";

interface CalendarValue {
  dateValue: dayjs.Dayjs | null;
  onDateChange: (date: any) => void;
}

export const CalendarDateValue: React.FC<CalendarValue> = ({
  dateValue,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    setSelectedDate(dateValue);
  }, [dateValue]);

  const handleDateChange = (date: any) => {
    const dayFormat = date ? dayjs(date) : null;
    setSelectedDate(dayFormat);
    onDateChange(dayFormat);
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

interface TimeValue {
  timeValue: dayjs.Dayjs | null;
  onTimechange: (time: any) => void;
}

export const CalendarTimeValue: React.FC<TimeValue> = ({
  timeValue,
  onTimechange,
}) => {
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  useEffect(() => {
    setSelectedTime(timeValue);
  }, [timeValue]);
  const handleChaneTime = (time: any) => {
    const timeFormat = time ? time: null;
    setSelectedTime(timeFormat);
    onTimechange(timeFormat);
  };
  return (
    <Space style={{ margin: "0" }}>
      <TimePicker
        value={selectedTime}
        className="custom-timepicker"
        placeholder="HH:mm:ss"
        format="HH:mm:ss"
        onChange={handleChaneTime}
      />
    </Space>
  );
};
