import React from "react";
import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

export const CalendarDate: React.FC = () => (
 
    <Space direction="vertical" size={12} style={{margin:"0"}}>
      <DatePicker
        defaultValue={dayjs("01/01/2023", dateFormatList[0])}
        format={dateFormatList}
        className="custom-datepicker"
      />
    </Space>
  
);

export const CalendarTime: React.FC = () => {
  const handleTimeChange = (time: any, timeString: string) => {
    console.log("HH:mm:ss", timeString);
  };
  return (
   
      <Space style={{margin:"0"}}>
        <TimePicker   className="custom-timepicker" placeholder="HH:mm:ss" onChange={handleTimeChange} format="HH:mm:ss"  />
      </Space>
   
  );
};
