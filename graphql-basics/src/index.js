import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { Comment } from './resolvers/Comment';
import { Mutation } from './resolvers/Mutation';
import { Subscription } from './resolvers/Subscription';
import { Post } from './resolvers/Post';
import { Query } from './resolvers/Query';
import { User } from './resolvers/User';

const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log('The server is up!');
});