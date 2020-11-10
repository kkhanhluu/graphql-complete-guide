const { prisma } = require('../src/prisma');
const { getClient } = require('./utils/getClient');
const { deleteComment, subscribeToComment } = require('./utils/operations');
import 'cross-fetch/polyfill';
const {
  userOne,
  commentTwo,
  commentOne,
  seedDatabase,
  postOne,
} = require('./utils/seedDatabase');

const client = getClient();

beforeEach(seedDatabase);
test('Should delete own comment', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: commentTwo.comment.id,
  };
  await client.mutate({ mutation: deleteComment, variables });

  const exists = await prisma.exists.Comment({ id: commentTwo.comment.id });

  expect(exists).toBe(false);
});

test('Should not delete other users comment', async () => {
  const client = getClient(userOne.jwt);
  const variables = {
    id: commentOne.comment.id,
  };
  await expect(
    client.mutate({ mutation: deleteComment, variables })
  ).rejects.toThrow();
});

test('Should subscribe to comments for a post', async (done) => {
  const variables = {
    postId: postOne.post.id,
  };

  client.subscribe({ query: subscribeToComment, variables }).subscribe({
    next(response) {
      expect(response.data.comment.mutation).toBe('DELETED');
      done();
    },
  });

  // change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } });
});
