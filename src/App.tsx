import React from "react";
import Menuu from "./components/Menu";
import "./css/index.css";
import Mainright from "./components/Mainright";

function App() {
  return (
    <>
      <div className="bgbody">
        <Menuu />
        <Mainright />
      </div>
    </>
  );
}

export default App;
