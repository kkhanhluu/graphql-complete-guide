import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers';

export const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'thisismysupersecrettext',
  fragmentReplacements,
});
