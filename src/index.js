import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/icons/icons.css";
import './styles/dark.css'
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from "./reducers/store";

const rootElement = ReactDOM.createRoot(document.getElementById("root"));

rootElement.render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);