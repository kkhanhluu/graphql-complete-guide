export const Subscription = {
  comment: {
    subscribe(parent, { id }, { db, pubsub }, info) {
      const post = db.posts.find((p) => p.id === id && p.published);

      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.asyncIterator(`comment ${id}`);
    },
  },

  post: {
    subscribe(parent, ctx, { db, pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};
