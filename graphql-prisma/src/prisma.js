import { Prisma } from 'prisma-binding';

export const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'thisismysupersecrettext',
});

// prisma.query
//   .posts(null, '{ id title body author { id name }}')
//   .then((data) => console.log(JSON.stringify(data, undefined, 2)));
// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ckgpademb007y0762i8ap1x2i',
//           },
//         },
//       },
//     },
//     '{ id title body published }'
//   )
//   .then((data) => {
//     console.log(data);
//   });

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: 'ckgqgqbzs000s0862vcrg1rnb',
//       },
//       data: {
//         body:
//           'GraphQL Course of Adrew Mead. A very detailed course about graphQL',
//         published: true,
//       },
//     },
//     '{id title body published}'
//   )
//   .then((data) => {
//     return prisma.query.posts(
//       null,
//       '{id title body published author{id name}}'
//     );
//   })
//   .then((data) => console.log(JSON.stringify(data, null, 2)));

// const createPostForUser = async (authorId, data) => {
//   const userExist = await prisma.exists.User({ id: authorId });

//   if (!userExist) {
//     throw new Error('User does not exist');
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     '{ id author { id name email posts {id title published } } }'
//   );

//   return post.author;
// };

// const updatePostForUser = async (postId, data) => {
//   const postExist = await prisma.exists.Post({ id: postId });

//   if (!postExist) {
//     throw new Error('Post does not exist');
//   }

//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId,
//       },
//       data,
//     },
//     '{id author {id name email posts { id title published body } } }'
//   );

//   return post.author;
// };

// // createPostForUser('ckgpb3jt000h10762pkrjkwvj', {
// //   title: 'Great post to read',
// //   body: 'The war of art',
// //   published: true,
// // })
// //   .then((data) => console.log(JSON.stringify(data)))
// // .catch((err) => console.error(err));

// updatePostForUser('ckgpatpdi00eo07623trqsjvs', {
//   body: 'Updated body Khanh Luu',
// })
//   .then((data) => {
//     console.log(JSON.stringify(data, null, 2));
//   })
//   .catch((err) => console.error(err));
