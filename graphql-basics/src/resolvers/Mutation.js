import { v4 as uuidv4 } from 'uuid';

export const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((u) => u.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email is already taken');
    }

    const user = {
      id: uuidv4(),
      email: args.data.email,
      name: args.data.name,
      age: args.data.age,
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((u) => u.id === args.id);

    if (userIndex < 0) {
      throw new Error('User does not exist');
    }

    const deletedUser = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((p) => {
      const match = p.author === args.id;

      if (match) {
        db.comments = db.comments.filter((c) => c.post !== p.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((c) => c.author !== deletedUser[0].id);

    return deletedUser[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((u) => u.email === data.email);

      if (emailTaken) {
        throw new Error('Email already taken');
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },
  createPost(parent, args, { db, pubsub }, info) {
    const { title, body, author, published } = args.data;

    const userExists = db.users.some((u) => u.id === author);
    if (!userExists) {
      throw new Error('User does not exist');
    }

    const post = {
      id: uuidv4(),
      title,
      body,
      author,
      published,
    };

    if (published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }

    db.posts.push(post);

    return post;
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { title, body, published } = args.data;

    const post = db.posts.find((p) => p.id === args.id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof title === 'string') {
      post.title = title;
    }

    if (typeof body === 'string') {
      post.body = body;
    }

    if (typeof published === 'boolean') {
      post.published = published;

      if (originalPost.published && !published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: post,
          },
        });
      } else if (!originalPost.published && published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      });
    }

    return post;
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((p) => p.id === args.id);

    if (postIndex < 0) {
      throw new Error('Post does not exist');
    }

    const deletedPost = db.posts.splice(postIndex, 1)[0];

    db.comments = db.comments.filter((c) => c.post !== args.id);

    if (deletedPost.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPost,
        },
      });
    }
    return deletedPost;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const { text, author, post } = args.data;

    const userExists = db.users.some((u) => u.id === author);
    const postExists = db.posts.some((p) => p.id === post);

    if (!userExists) {
      throw new Error('User does not exist');
    }

    if (!postExists) {
      throw new Error('Post does not exist');
    }

    const comment = {
      id: uuidv4(),
      text,
      author,
      post,
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${post}`, {
      comment: {
        mutation: 'CREATED',
        data: comment,
      },
    });

    return comment;
  },
  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex((c) => c.id === args.id);

    if (commentIndex < 0) {
      throw new Error('Comment not found');
    }

    const deletedComment = db.comments.splice(commentIndex, 1)[0];
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment,
      },
    });
    return deletedComment;
  },
  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const comment = db.comments.find((c) => c.id === id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'UPDATED',
        data: comment,
      },
    });
    return comment;
  },
};
