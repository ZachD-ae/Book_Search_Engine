import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }


  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

 
  type Auth {
    token: String
    user: User
  }


  type Query {
    me: User  # Get the current logged-in user
  }


  type Mutation {
    login(email: String!, password: String!): Auth  
    addUser(username: String!, email: String!, password: String!): Auth  
      authors: [String!]!
      description: String
      title: String
      bookId: String!
      image: String
      link: String
    ): User  
    removeBook(bookId: String!): User  
`;
