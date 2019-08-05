import ApolloClient, { InMemoryCache } from "apollo-boost";
import React, { Suspense } from "react";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import "./App.less";
import MainApp from "./containers";

const client = new ApolloClient({
  uri: "http://165.22.219.65:8000/graphql",
  credentials: "include",
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return (
    <ApolloHooksProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <MainApp />
      </Suspense>
    </ApolloHooksProvider>
  );
};

export default App;
