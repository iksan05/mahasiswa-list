import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Mahasiswa from "./Mahasiswa";

//buat apollo client dan set URL untuk mengirim dan meminta data ke graphql server
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Mahasiswa />
      </div>
    </ApolloProvider>
  );
}

export default App;
