import { collection, getDocs } from "firebase/firestore";
import { CalendarDate } from "../components/Calendar/Calendar";
import ChartDoughnut from "../components/Charts/DoughtnutChart";
import LineChartComponent from "../components/Charts/Linechart";
import apiFirebase from "../firebase/apiFirebase";
import { useEffect, useState } from "react";

interface FirebaseData {
  id: string;
  ngaysudung: string;
  tinhtrang: string;
  giave: number;
}
const Home = () => {
  const [datafamily, setDataFamily] = useState<FirebaseData[]>([]);
  const [dataEvent, setDataEvent] = useState<FirebaseData[]>([]);
  const [selected, setSelectedMonth] = useState<string | null>("04/2021");
  const [selectedmonth, setSelectedMonthlinechart] = useState<string | null>(
    "04/2021"
  );
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };
  const handleChangeMonthLinechart = (month: string) => {
    setSelectedMonthlinechart(month);
  };

  const fetchDataEvent = async () => {
    const querySnapshot = await getDocs(collection(apiFirebase, "ticketEvent"));
    const fetchedData: FirebaseData[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });
    setDataEvent(fetchedData);
  };

  const fetchDataFamily = async () => {
    const querySnapshot = await getDocs(collection(apiFirebase, "ticket"));
    const fetchedData: FirebaseData[] = [];
    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });
    setDataFamily(fetchedData);
  };
  useEffect(() => {
    fetchDataEvent();
    fetchDataFamily();
  }, []);

  let totalVeChuasudungGiadinh = 0;
  let totalVedasudungGiadinh = 0;
  let totalVeChuasudungSukien = 0;
  let totalVedasudungSukien = 0;
  let totalWeek1 = 0;
  let totalWeek2 = 0;
  let totalWeek3 = 0;
  let totalWeek4 = 0;
  let totalWeek5 = 0;

  datafamily.forEach((item) => {
    let date = Number(item.ngaysudung.split("/")[0]);

    let month = item.ngaysudung.split("/")[1];
    let month2 = selected?.split("/")[0];
    let month3 = selectedmonth?.split("/")[0];

    if (selected && month === month2) {
      if (item.tinhtrang === "Đã sử dụng") {
        totalVedasudungGiadinh += item.giave;
      }
      if (item.tinhtrang === "Chưa sử dụng") {
        totalVeChuasudungGiadinh += item.giave;
      }
    }

    if (selectedmonth && month === month3) {
      if (date >= 1 && date <= 7) {
        totalWeek1 += item.giave;
      }
      if (date >= 8 && date <= 14) {
        totalWeek2 += item.giave;
      }
      if (date >= 15 && date <= 21) {
        totalWeek3 += item.giave;
      }
      if (date >= 22 && date <= 28) {
        totalWeek4 += item.giave;
      }
      if (date >= 29 && date <= 31) {
        totalWeek5 += item.giave;
      }
    }
  });
  dataEvent.forEach((item) => {
    let date = Number(item.ngaysudung.split("/")[0]);
    let month = item.ngaysudung.split("/")[1];
    let month2 = selected?.split("/")[0];
    let month3 = selectedmonth?.split("/")[0];

    if (selected && month === month2) {
      if (item.tinhtrang === "Đã sử dụng") {
        totalVedasudungSukien += item.giave;
      }
      if (item.tinhtrang === "Chưa sử dụng") {
        totalVeChuasudungSukien += item.giave;
      }
    }

    if (selectedmonth && month === month3) {
      if (date >= 1 && date <= 7) {
        totalWeek1 += item.giave;
      }
      if (date >= 8 && date <= 14) {
        totalWeek2 += item.giave;
      }
      if (date >= 15 && date <= 21) {
        totalWeek3 += item.giave;
      }
      if (date >= 22 && date <= 28) {
        totalWeek4 += item.giave;
      }
      if (date >= 29 && date <= 31) {
        totalWeek5 += item.giave;
      }
    }
  });

  return (
    <>
      <div className="content">
        <div className="main">
          <h2>Thống kê</h2>
          <div className="labelDoanhthu">
            <span>Doanh thu</span>
            <div className="">
              <CalendarDate onMonthChange={handleChangeMonthLinechart} />
            </div>
          </div>
          <div className="chart1">
            <LineChartComponent
              week1={totalWeek1.toString()}
              week2={totalWeek2.toString()}
              week3={totalWeek3.toString()}
              week4={totalWeek4.toString()}
              week5={totalWeek5.toString()}
            />
          </div>
          <span style={{ color: "#1E0D03", fontSize: "13px" }}>
            Tổng doanh thu theo tuần
          </span>{" "}
          <br />
          <h3 style={{ display: "inline" }}>525.145.000</h3> <span>đồng</span>
          <div className="chart2">
            <div className="">
              <CalendarDate onMonthChange={handleMonthChange} />
            </div>
            <div className="chartGiadinh">
              <h4>Gói gia đình</h4>
              <div style={{ height: "190px", width: "190px" }}>
                <ChartDoughnut
                  vedasudung={totalVedasudungGiadinh}
                  vechuasudung={totalVeChuasudungGiadinh}
                />
              </div>
            </div>
            <div className="chartSukien">
              <h4>Gói sự kiện </h4>
              <div style={{ height: "190px", width: "190px" }}>
                <ChartDoughnut
                  vedasudung={totalVedasudungSukien}
                  vechuasudung={totalVeChuasudungSukien}
                />
              </div>
            </div>
            <div className="mota">
              <button></button> <span>Vé chưa sử dụng</span>
              <br />
              <button></button> <span>Vé đã sử dụng</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
