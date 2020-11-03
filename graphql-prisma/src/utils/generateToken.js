import jwt from 'jsonwebtoken';

export const generateToken = (userId) =>
  jwt.sign({ userId }, 'thisisasecret', { expiresIn: '2 days' });
