import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

if (import.meta.VITE_ENV === "development") {
  console.log = () => {};
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
