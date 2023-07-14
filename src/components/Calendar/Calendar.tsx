import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const Calendar: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker
      defaultValue={dayjs("01/01/2023", dateFormatList[0])}
      format={dateFormatList}
      className="custom-datepicker"
    />
  </Space>
);

export default Calendar;
