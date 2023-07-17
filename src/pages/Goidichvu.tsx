import { useState } from "react";
import ModalGoidichvu from "../components/Modals/ModalThemGoidichvu";
import TableGoive from "../components/Tables/TableGoive";

const Goidichvu = () => {
  const [modalvisible, setModalVisible] = useState<boolean>(false)
  const openModal = () =>{
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false);
  };
    return (
      <>
      <div className="content">
        <div className="main">
              <h2>Danh sách gói vé</h2>
              <div className="congcutimve">
            <div className="timve">
              <input
                type="text"
                placeholder="Tìm bằng số vé"
                className="inputseach"
              />
              <i className="bi bi-search"></i>
            </div>
            <div className="themve">
              <button type="button" className="btn-themgoive"  onClick={openModal}>
                Thêm gói vé
              </button>
              <button className="btn-xuatfile">Xuất file (.csv)</button>
            </div>
          </div>
        <TableGoive />
        </div>
      </div>
      <ModalGoidichvu visible={modalvisible} onClose={closeModal} />
      </>
    );
  };
  
  export default Goidichvu;
  