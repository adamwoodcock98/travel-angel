import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import VerticalTabs from "./components/dashboard/dashboard"
import NavBar from "./components/navBar/navBar"
import reportWebVitals from "./reportWebVitals";
import { Authentication } from "./components/authentication/authentication";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavBar/>
    <VerticalTabs />
    <Authentication />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
