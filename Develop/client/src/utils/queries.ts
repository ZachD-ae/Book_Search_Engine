import { gql } from '@apollo/client';

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    books {
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;

