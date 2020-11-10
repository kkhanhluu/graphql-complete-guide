import 'cross-fetch/polyfill';
import { prisma } from '../src/prisma';
import { getClient } from './utils/getClientWithoutSub';
import { createUser, getUsers, login, me } from './utils/operations';
import { seedDatabase, userOne } from './utils/seedDatabase';

const client = getClient();

beforeEach(seedDatabase);

test('Should create new user', async () => {
  const variables = {
    data: {
      name: 'Khanh Luu',
      email: 'khanh@example.com',
      password: 'abc123456',
    },
  };
  const response = await client.mutate({
    mutation: createUser,
    variables,
  });

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id,
  });

  expect(exists).toBe(true);
});

test('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers });

  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe('Nhi Ngoen');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: { email: 'test@example.com', password: 'fadfdafkssfasd' },
  };
  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('Should not sign up with too short password', async () => {
  const variables = {
    data: { email: 'jess@example.com', name: 'jess', password: '123' },
  };
  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);

  const { data } = await client.query({ query: me });

  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
