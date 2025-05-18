import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas/index';
import { authenticateToken } from './services/auth';

const app: Application = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authenticateToken(req);
    if (!user) {
      throw new Error('Not authenticated');
    }
    return { user };
  },
});

server.applyMiddleware({ app: app as any });

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001/graphql');
});