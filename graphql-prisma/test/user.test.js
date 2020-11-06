import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import { prisma } from '../src/prisma';

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
});

test('Should create new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Khanh Luu"
          email: "khanh@example.com"
          password: "abc123456"
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser,
  });

  const exists = prisma.exists.User({ id: response.data.createUser.user.id });

  expect(exists).toBe(true);
});
