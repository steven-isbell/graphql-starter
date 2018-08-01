const { GraphQLServer } = require('graphql-yoga');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

server.start(options, () =>
  console.log(`Server is running on localhost:${options.port}`)
);
