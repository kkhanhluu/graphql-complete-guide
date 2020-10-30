export const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter((u) =>
      u.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    const { query } = args;
    return db.posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.body.toLowerCase().includes(query.toLowerCase())
    );
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  },
};
