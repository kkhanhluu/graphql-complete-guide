const users = [
  {
    id: '1',
    name: 'Khanh',
    email: 'test@test.com',
    age: 23,
  },
  {
    id: '2',
    name: 'Mike',
    email: 'mike@test.com',
    age: 23,
  },
  {
    id: '3',
    name: 'Laura',
    email: 'laura@test.com',
    age: 23,
  },
];

const posts = [
  {
    id: 'a1',
    title: 'title 1',
    body: 'body 1',
    published: true,
    author: '1',
  },
  {
    id: 'a2',
    title: 'title 1',
    body: 'lorem 1',
    published: false,
    author: '1',
  },
  {
    id: 'a3',
    title: 'title 1',
    body: 'ipsum 1',
    published: true,
    author: '3',
  },
];

const comments = [
  {
    id: 'c1',
    text:
      'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
    author: '3',
    post: 'a2',
  },
  {
    id: 'c2',
    text:
      'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
    author: '2',
    post: 'a2',
  },
  {
    id: 'c3',
    text:
      'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
    author: '3',
    post: 'a1',
  },
  {
    id: 'c4',
    text:
      'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
    author: '1',
    post: 'a3',
  },
];

const db = {
  users,
  posts,
  comments,
};

export default db;
