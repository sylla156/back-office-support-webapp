
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

// core styles
import "./scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";
import App from './App';

ReactDOM.render(
  <HashRouter>
      <App/>
    </HashRouter>,
  document.getElementById("root")
);
