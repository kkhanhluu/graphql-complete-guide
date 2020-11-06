import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { prisma } from './prisma';
import { fragmentReplacements, resolvers } from './resolvers';

const pubsub = new PubSub();

export const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});
