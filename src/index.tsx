import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UIContextProvider } from "./store/ui-context";

ReactDOM.render(
  <React.StrictMode>
    <UIContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </UIContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
