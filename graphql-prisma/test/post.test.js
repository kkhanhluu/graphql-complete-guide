import 'cross-fetch/polyfill';
import { prisma } from '../src/prisma';
import { getClient } from './utils/getClient';
import {
  createPost,
  deletePost,
  getMyPosts,
  getPosts,
  updatePost,
  subscribeToPost,
} from './utils/operations';
import { postOne, postTwo, seedDatabase, userOne } from './utils/seedDatabase';

const client = getClient();

beforeEach(seedDatabase);

test('Should return published post', async () => {
  const response = await client.query({ query: getPosts });

  expect(response.data.posts.length).toBe(1);
  expect(response.data.posts[0].published).toBe(true);
  expect(response.data.posts[0].title).toBe('test post');
  expect(response.data.posts[0].body).toBe('test body');
});

test('Should return my posts', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: getMyPosts });

  expect(data.myPosts.length).toBe(2);
  expect(data.myPosts[0].published).toBe(true);
  expect(data.myPosts[0].title).toBe('test post');
  expect(data.myPosts[0].body).toBe('test body');

  expect(data.myPosts[1].published).toBe(false);
  expect(data.myPosts[1].title).toBe('test unpublished post');
  expect(data.myPosts[1].body).toBe('test unpublished body');
});

test('Should be able to update own posts', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    id: postOne.post.id,
    data: {
      published: false,
    },
  };

  const { data } = await client.mutate({ mutation: updatePost, variables });

  expect(data.updatePost.published).toBe(false);
});

test('Should create a post', async () => {
  const client = getClient(userOne.jwt);

  const variables = {
    data: { title: 'hello', body: 'hello body', published: true },
  };
  const { data } = await client.mutate({ mutation: createPost, variables });
  const exists = await prisma.exists.Post({ id: data.createPost.id });

  expect(exists).toBe(true);
});

test('Should delete the second post', async () => {
  const client = await getClient(userOne.jwt);

  const variables = {
    id: postTwo.post.id,
  };

  await client.mutate({ mutation: deletePost, variables });
  const exist = await prisma.exists.Post({ id: postTwo.post.id });

  expect(exist).toBe(false);
});

test('Should subscribe to a post', async (done) => {
  await client.subscribe({ query: subscribeToPost }).subscribe({
    next(response) {
      expect(response.data.post.mutation).toBe('UPDATED');
      done();
    },
  });

  await prisma.mutation.updatePost({
    where: { id: postOne.post.id },
    data: { title: 'Hello' },
  });
});
