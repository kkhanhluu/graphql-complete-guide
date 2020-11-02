import { getUserId } from '../utils/getUserId';

export const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },

  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true,
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },

  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const opArgs = {
      where: {
        author: {
          id: userId,
        },
      },
    };

    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },

  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },

  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              author: {
                id: userId,
              },
            },
            {
              published: true,
            },
          ],
        },
      },
      info
    );

    if (posts.length === 0) {
      throw new Error('No post found');
    }

    return posts[0];
  },

  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.user({ where: { id: userId } }, info);
  },
};
