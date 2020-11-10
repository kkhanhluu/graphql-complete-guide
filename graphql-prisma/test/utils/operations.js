import { gql } from 'apollo-boost';

export const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

export const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const login = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`;

export const me = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

export const getPosts = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

export const getMyPosts = gql`
  query {
    myPosts {
      title
      body
      published
    }
  }
`;

export const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      body
      published
    }
  }
`;

export const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      published
      body
    }
  }
`;

export const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const subscribeToComment = gql`
  subscription($postId: ID!) {
    comment(id: $postId) {
      mutation
      node {
        id
      }
    }
  }
`;

export const subscribeToPost = gql`
  subscription {
    post {
      mutation
      node {
        id
        title
      }
    }
  }
`;
