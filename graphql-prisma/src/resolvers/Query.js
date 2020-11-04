import { getUserId } from '../utils/getUserId';

// test comment
export const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      orderBy: args.orderBy,
    };

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.users(opArgs, info);
  },

  posts(parent, args, { prisma }, info) {
    const opArgs = {
      // where: {
      //   published: true,
      // },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
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
      skip: args.skip,
      first: args.first,
      after: args.after,
      orderBy: args.orderBy,
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
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
    };
    return prisma.query.comments(opArgs, info);
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
