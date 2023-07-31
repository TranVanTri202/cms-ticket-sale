import { CalendarDate } from "../components/Calendar/Calendar";
import ChartDoughnut from "../components/Charts/DoughtnutChart";
import LineChartComponent from "../components/Charts/Linechart";

const Home = () => {
  return (
    <>
      <div className="content">
        <div className="main">
          <h2>Thống kê</h2>
          <div className="labelDoanhthu">
            <span>Doanh thu</span>
            <CalendarDate />
          </div>
          <div className="chart1">
            <LineChartComponent />
          </div>
          <span style={{ color: "#1E0D03", fontSize: "13px" }}>
            Tổng doanh thu theo tuần
          </span>{" "}
          <br />
          <h3 style={{ display: "inline" }}>525.145.000</h3> <span>đồng</span>
          <div className="chart2">
            <CalendarDate />
            <div className="chartGiadinh">
              <h4>Gói gia đình</h4>
              <div style={{ height: "190px", width: "190px" }}>
                <ChartDoughnut />
              </div>
            </div>
            <div className="chartSukien">
              <h4>Gói sự kiện </h4>
              <div style={{ height: "190px", width: "190px" }}>
                <ChartDoughnut />
              </div>
            </div>
            <div className="mota">
              <button></button> <span>Vé đã sử dụng</span> <br />
              <button></button> <span>Vé chưa sử dụng</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
