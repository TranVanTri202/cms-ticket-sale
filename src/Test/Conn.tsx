import { useState } from "react";

interface ConProps {
    onRadioChange: (value: string) => void;
  }
  
  const Con: React.FC<ConProps> = ({ onRadioChange }) => {
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      
      setSelectedValue(event.target.value);
      onRadioChange(event.target.value);
    };
  
    return (
      <div>
        <input
          type="radio"
          value="Option 1"
          checked={selectedValue === "Option 1"}
          onChange={handleRadioChange}
        />
        <input
          type="radio"
          value="Option 2"
          checked={selectedValue === "Option 2"}
          onChange={handleRadioChange}
        />
      </div>
    );
  };
export default Con;