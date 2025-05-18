import User from '../models/User';
import jwt from 'jsonwebtoken';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await User.findById(context.user._id);
    },
  },

  Mutation: {
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });

      return { token, user };
    },

    addUser: async (_: any, { username, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const user = new User({ username, email, password });

      await user.save();

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });

      return { token, user };
    },

    saveBook: async (_: any, { authors, description, title, bookId, image, link }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error('User not found');
      }

      const existingBook = user.savedBooks.find((book: any) => book.bookId === bookId);
      if (existingBook) {
        throw new Error('Book is already saved');
      }

      const book = { authors, description, title, bookId, image, link };
      const bookSubdoc = user.savedBooks.create(book);
      user.savedBooks.push(bookSubdoc);

      await user.save();

      return user;
    },

    removeBook: async (_: any, { bookId }: any, context: any) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw new Error('User not found');
      }

      user.savedBooks = user.savedBooks.filter((book: any) => book.bookId !== bookId);
      await user.save();

      return user;
    },
  },
};
