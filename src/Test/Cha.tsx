import { useState } from "react";
import Con from "./Conn";

const Cha: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState("");
    return (
      <div>
        <Con onRadioChange={setSelectedOption} />
        <h2>{selectedOption}</h2>
      </div>
    );
  };
  
  export default Cha;