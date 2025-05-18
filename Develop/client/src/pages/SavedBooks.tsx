import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { data, loading, error } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({
        variables: { bookId },
      });
    } catch (err) {
      console.error('Error removing book:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.me.savedBooks.map((book: any) => (
        <div key={book.bookId}>
          <p>{book.title}</p>
          <button onClick={() => handleDeleteBook(book.bookId)}>Remove Book</button>
        </div>
      ))}
    </div>
  );
};

export default SavedBooks;
