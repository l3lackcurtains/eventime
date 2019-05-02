import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./dashboard";

function MainApp() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}

export default MainApp;
