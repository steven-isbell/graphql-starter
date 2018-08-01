const { GraphQLServer } = require('graphql-yoga');
const { readFileSync } = require('fs');

const typeDefs = readFileSync(`${__dirname}/schema/typeDefs.graphql`, 'utf8');
const resolvers = require('./schema/resolvers');
