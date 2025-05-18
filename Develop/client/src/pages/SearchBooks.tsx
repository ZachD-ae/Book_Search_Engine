import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { GET_BOOKS } from '../utils/queries';

const SearchBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS); 
  const [saveBook] = useMutation(SAVE_BOOK);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);

  if (loading) return <p>Loading books...</p>; 
  if (error) return <p>Error fetching books: {error.message}</p>; 

  const handleSaveBook = async (book: any) => {
    try {
      const { data } = await saveBook({
        variables: {
          authors: book.authors,
          description: book.description,
          title: book.title,
          bookId: book.bookId,
          image: book.image,
          link: book.link,
        },
      });

      setSavedBookIds([...savedBookIds, data.saveBook.savedBooks[0].bookId]);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <div>
      {data.books.map((book: any) => (
        <div key={book.bookId}>
          <p>{book.title}</p>
          <button onClick={() => handleSaveBook(book)}>Save Book</button>
        </div>
      ))}
    </div>
  );
};

export default SearchBooks;
