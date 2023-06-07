import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import ToggleProvider from "./Context/ToggleProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToggleProvider>
        <App className="font-nunito" />
      </ToggleProvider>
    </Provider>
  </BrowserRouter>
);
