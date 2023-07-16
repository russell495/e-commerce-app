const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Category } = require("./resolvers/Category");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Product } = require("./resolvers/Product");
const { db } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Product,
    Category,
  },
  context: {
   db
  },
});

server.listen().then(({ url }) => {
  console.log("Server is ready at + " + url);
});
