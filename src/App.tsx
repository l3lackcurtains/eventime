import React from "react";
import "antd/dist/antd.css";

import "./App.scss";
import MainApp from "./containers";

const App: React.FC = () => {
  return (
    <div className="App">
      <MainApp />
    </div>
  );
};

export default App;
