const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 8080 }, () => {
  console.log("Now browse to http://localhost:8080" + server.graphqlPath);
});
