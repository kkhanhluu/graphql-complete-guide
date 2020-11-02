import { getUserId } from '../utils/getUserId';

export const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }

      return null;
    },
  },

  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request);

      if (userId && userId === parent.id) {
        return parent.posts;
      }

      return parent.posts.filter((p) => p.published);
    },
  },
};
