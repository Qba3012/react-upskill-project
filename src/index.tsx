import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ApiContextProvider } from "./store/api-context";

ReactDOM.render(
  <React.StrictMode>
    <ApiContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
