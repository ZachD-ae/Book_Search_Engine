import { AuthenticationError } from '../services/auth'; 
import { User } from '../models'; 
import { signToken } from '../services/auth';
 



interface RemoveBookArgs {
  bookId: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findById(context.user._id).populate('savedBooks'); // Populate savedBooks to include the book details
      }
      throw new AuthenticationError('Not authenticated');
    },
  },

  Mutation: {
    // User login
    login: async (_parent: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email);
      return { token, user };
    },

    // Create a new user and return a token
    addUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError('User already exists');
      }

      const user = new User({ username, email, password });
      await user.save();

      const token = signToken(user.username, user.email);
      return { token, user };
    },



    // Remove a book from the user's savedBooks
    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }

      const user = await User.findById(context.user._id);
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      user.savedBooks = user.savedBooks.filter((book: any) => book.bookId !== bookId);
      await user.save();

      return user;
    },
  },
};

export default resolvers;