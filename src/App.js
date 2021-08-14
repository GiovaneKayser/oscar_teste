import React from "react";
import { Router } from "react-router-dom";

import history from "./services/history";
import Routes from "./routes/Routes";
import "./App.scss";

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
