
import { Routes, Route } from "react-router-dom";
import Navtop from "./Navtop";
import Trangchu from "./Trangchu";
import Quanlyve from "./Quanlyve";
import Doisatve from "./Doisoatve";
import Goidichvu from "./Goidichvu";

const Mainright = () => {
    return ( 
        <div>
            <Navtop />
            <Routes>
                <Route path="/" element={<Trangchu />} />
                <Route path="/danhsachve" element={<Quanlyve />} />
                <Route path="/doisoatve" element={<Doisatve />} />
                <Route path="/goidichvu" element={<Goidichvu />} />
            </Routes>
        </div>
     );
}
 
export default Mainright;