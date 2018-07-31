const { GraphQLServer } = require('graphql-yoga');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const options = {
  port: 3001,
  endpoint: '/graphql',
  playground: '/graphiql'
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req.request
  })
});

server.start(options, () =>
  console.log(`Server is running on localhost:${options.port}`)
);
