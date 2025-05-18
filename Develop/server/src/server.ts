import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './schemas/resolvers';
import { authenticateToken } from './auth';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Authenticate user and pass user info to resolvers
    const user = authenticateToken(req);

    // If the user is authenticated, return it in the context
    if (!user) {
      throw new Error('Not authenticated');
    }

    return { user };
  },
});

server.applyMiddleware({ app });

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001/graphql');
});
