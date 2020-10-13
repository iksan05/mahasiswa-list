const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const app = express();

// buat apollo server dengan memberikan nilai typeDefs dan resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// set middleware
server.applyMiddleware({ app });

app.listen({ port: 8080 }, () => {
  console.log("Now browse to http://localhost:8080" + server.graphqlPath);
});