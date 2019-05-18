import ApolloClient, { InMemoryCache } from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import "./App.css";
import MainApp from "./containers";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MainApp />
    </ApolloProvider>
  );
};

export default App;
