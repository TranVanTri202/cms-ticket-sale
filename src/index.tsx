import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./css/Content.css"
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
