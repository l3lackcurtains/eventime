import ApolloClient, { InMemoryCache } from "apollo-boost";
import React, { Suspense } from "react";
import { ApolloProvider } from "react-apollo-hooks";
import "./App.less";
import MainApp from "./containers";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <MainApp />
      </Suspense>
    </ApolloProvider>
  );
};

export default App;
