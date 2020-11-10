import { prisma } from '../../src/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userOne = {
  input: {
    name: 'Nhi Ngoen',
    email: 'Nhi@example.com',
    password: bcrypt.hashSync('test123456'),
  },
  user: undefined,
  jwt: undefined,
};

export const userTwo = {
  input: {
    name: 'Khanh Liu',
    email: 'Khanh@example.com',
    password: bcrypt.hashSync('red123456'),
  },
  user: undefined,
  jwt: undefined,
};

export const postOne = {
  input: {
    title: 'test post',
    body: 'test body',

    published: true,
  },
  post: undefined,
};

export const postTwo = {
  input: {
    title: 'test unpublished post',
    body: 'test unpublished body',
    published: false,
  },
  post: undefined,
};

export const commentOne = {
  input: {
    text: 'test comment on post 1',
  },
  comment: undefined,
};

export const commentTwo = {
  input: {
    text: 'test comment on post 2',
  },
  comment: undefined,
};

export const seedDatabase = async () => {
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyPosts();
  await prisma.mutation.deleteManyUsers();

  userOne.user = await prisma.mutation.createUser({
    data: userOne.input,
  });

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, 'thisisasecret');

  userTwo.user = await prisma.mutation.createUser({ data: userTwo.input });
  userTwo.jwt = jwt.sign({ userId: userTwo.id }, 'thisisasecret');

  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id,
        },
      },
      author: {
        connect: {
          id: userTwo.user.id,
        },
      },
    },
  });

  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id,
        },
      },
      author: {
        connect: {
          id: userOne.user.id,
        },
      },
    },
  });
};
