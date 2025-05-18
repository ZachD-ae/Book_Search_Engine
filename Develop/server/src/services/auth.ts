import { Request } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  _id: string;
  username: string;
  email: string;
}

export const authenticateToken = (req: Request): JwtPayload | null => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      const user = jwt.verify(token, secretKey) as JwtPayload;
      return user;
    } catch (error) {
      return null;
    }
  }

  return null;
};

export const signToken = (username: string, email: string, ) => {
  const payload = { username, email, }; // You can include any user details you want in the token

  // Use your JWT secret (preferably set in environment variables)
  const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key

  // Sign the token with an expiration time of 1 hour
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}