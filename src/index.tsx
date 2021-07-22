import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { ApiContextProvider } from './store/api-context';

ReactDOM.render(
  <React.StrictMode>
    <ApiContextProvider>
      <App />
    </ApiContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
