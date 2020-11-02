import { extractFragmentReplacements } from 'prisma-binding';

import { Comment } from './Comment';
import { Mutation } from './Mutation';
import { Subscription } from './Subscription';
import { Post } from './Post';
import { Query } from './Query';
import { User } from './User';

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment,
};

export const fragmentReplacements = extractFragmentReplacements(resolvers);
