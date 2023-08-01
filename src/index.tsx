import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./css/Content.css"
import "./css/Modal.css"
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { Provider } from "react-redux";
import store from "./components/redux/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
