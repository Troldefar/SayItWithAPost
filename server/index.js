const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { connectionString } = require('./config.js');
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return server.listen({port: 4000})
  })
  .then((res) => {
    console.log(`Running! ${res.url}`);
  })
  .catch((error) => {
    console.log(error);
  });