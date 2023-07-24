import { useState } from "react";
import { CalendarDate, CalendarDateValue } from "../components/Calendar/Calendar";
import DoisoatGiadinh from "../components/Tables/TableDoisoatGiadinh";
import DoisoatVesukien from "../components/Tables/TableDoisoatSukien";


const Doisatve = () => {
  const [beginDate, setBeginDate] = useState<string>(" ")
  const [endDate, setEndDate] = useState<string>(" ")
  const [ticketNumberr, setTicketNumber] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("giaDinh");
  const [selectOption, setSelectOption] = useState<boolean>(false)
  const handleTab = (tab: string) => {
    setSelectedTab(tab);
    if(tab === "giaDinh"){
      setSelectOption(false)
    } else{
      setSelectOption(true)
    }
  };

  const handleValueTicket = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketNumber(e.target.value);
  };
  const [valueTinhtrang, setValueTinhtrang] = useState<string>("Tất cả");
  const [onfillter, setOnfillter] = useState<string>("Tất cả");
  const handleValueTinhtrang = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTinhtrang(e.target.value);
  };

  const handleFilter = () => {
    setOnfillter(valueTinhtrang);
  };
  return (
    <>
      <div className="" style={{ display: "flex", width: "100%" }}>
        <div className="content">
          <div className="main">
            <h2> Đối soát vé</h2>{" "}
            <div className="btnchuyendoi">
              <button
                className={selectedTab === "giaDinh" ? "active" : ""}
                onClick={() => handleTab("giaDinh")}
              >
                Gói gia đình
              </button>

              <button
                className={selectedTab === "suKien" ? "active" : ""}
                onClick={() => handleTab("suKien")}
              >
                Gói sự kiện
              </button>
            </div>
            <div className="congcutimve">
              <div className="timve">
                <input
                  type="text"
                  placeholder="Tìm bằng số vé"
                  className="inputseach"
                  onChange={handleValueTicket}
                />
                <i className="bi bi-search"></i>
              </div>
              <div className="themve">
                <button className="btn-themgoive">Chốt đối soát</button>
              </div>
            </div>
            {selectedTab === "giaDinh" ? (
              <DoisoatGiadinh
                onfillter={onfillter}
                ticketNumber={ticketNumberr}
              />
            ) : (
              <DoisoatVesukien
                onfillter={onfillter}
                ticketNumber={ticketNumberr}
                tungay={beginDate}
                denngay={endDate}
              />
            )}
          </div>
        </div>
        <div className="layputlocve" style={{ width: "40%" }}>
          <div className="main">
            <h4 style={{ marginTop: "10px", fontWeight: "700" }}>Lọc vé</h4>
              {selectOption ?  <select name="" id="" className="form-select mt-2 mb-2" disabled>
              <option value="">Hội chợ triển lãm tiêu dùng 2021</option>
            </select>: <></>}
            <div className="tinhtrangdoisoat">
              <div className="">
                <span>Tình trạng đối soát</span>
              </div>
              <div className="">
                <div
                  className=""
                  style={{ alignItems: "center", display: "flex", gap: "10px" }}
                >
                  <input
                    type="radio"
                    checked={valueTinhtrang === "Tất cả"}
                    value="Tất cả"
                    onChange={handleValueTinhtrang}
                  />{" "}
                  <span>Tất cả</span>
                </div>
                <div
                  className=""
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <input
                    type="radio"
                    checked={valueTinhtrang === "Đã đối soát"}
                    value="Đã đối soát"
                    onChange={handleValueTinhtrang}
                  />{" "}
                  <span>Đã đối soát</span>
                </div>
                <div
                  className=""
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "10px",
                    marginTop: "5px",
                  }}
                >
                  <input
                    type="radio"
                    checked={valueTinhtrang === "Chưa đối soát"}
                    value="Chưa đối soát"
                    onChange={handleValueTinhtrang}
                  />{" "}
                  <span>Chưa đối soát</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "130px", marginTop: "20px" }}>
              <div className="">
                <span style={{ fontWeight: "500" }}>Loại vé</span>
              </div>
              <div className="">Vé cổng</div>
            </div>
            <div style={{ display: "flex", gap: "120px", marginTop: "20px" }}>
              <div className="">
                <span style={{ fontWeight: "500" }}>Từ ngày</span>
              </div>
              <div className="">
                <CalendarDateValue onDateChange={setBeginDate} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "110px", marginTop: "20px" }}>
              <div className="">
                <span style={{ fontWeight: "500" }}>Đến ngày</span>
              </div>
              <div className="">
                <CalendarDateValue onDateChange={setEndDate} />
              </div>
            </div>
          </div>
          <div className="btn-loc">
            <button onClick={handleFilter}>Lọc</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doisatve;
