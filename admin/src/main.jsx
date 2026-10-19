import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
// PrimeReact styles must come after Tailwind's base layer.
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import PrimeReact from "primereact/api";
import App from "./app/App.jsx";

// Dropdown lists open on top of the page, so a dialog never clips them.
PrimeReact.appendTo = document.body;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
