import React from "react";
import "antd/dist/antd.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

import "./App.scss";
import MainApp from "./containers";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MainApp />
    </ApolloProvider>
  );
};

export default App;
