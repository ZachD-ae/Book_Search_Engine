
# **Book Search Engine**

A full-stack application built using **Apollo Server** for GraphQL, **React** for the frontend, and **MongoDB** for persistent data storage. The app integrates with the **Google Books API** to search for books and allows users to save their favorites, manage their account, and log in with JWT authentication.

## **Features**
- **Search for books** from the Google Books API using flexible search filters.
- **User authentication** with JWT (JSON Web Token).
- **Save and remove books** from a personal collection.
- **Responsive UI** built with **React**.
- **Backend built with Apollo Server** for GraphQL queries and mutations.
- **Data persistence** via MongoDB with Mongoose.

## **Technologies Used**
- **Frontend**:
  - React (with Hooks)
  - Apollo Client for GraphQL communication
- **Backend**:
  - Apollo Server for GraphQL
  - Node.js/Express for the server
  - MongoDB for data storage
  - JWT Authentication for secure login
- **Tools**:
  - TypeScript for type safety
  - Vite for fast frontend development
  - Nodemon for server-side development

## **Installation and Setup**

### **Backend Setup (Server)**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-search-engine.git
   ```

2. Navigate to the server folder:
   ```bash
   cd book-search-engine/server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the `.env` file in the server directory to store sensitive data:

   Create a `.env` file and add the following:
   ```bash
   JWT_SECRET_KEY=your-secret-key
   MONGO_URI=your-mongodb-uri
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
   The server should now be running on `http://localhost:3001/graphql`.

### **Frontend Setup (Client)**

1. Navigate to the client folder:
   ```bash
   cd book-search-engine/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the client:
   ```bash
   npm run dev
   ```
   The frontend should now be running on `http://localhost:3000`.

### **Running Both Server and Client with Concurrently**

If you want to run both the server and client together in development mode, you can run the following command from the root directory:

```bash
npm run develop
```

This will use `concurrently` to start both the backend and frontend in parallel, making development easier.

## **Usage**

### **GraphQL Queries and Mutations**

- **Login**: Use the login mutation to authenticate a user.

  Example query:
  ```graphql
  mutation {
    login(email: "user@example.com", password: "password") {
      token
      user {
        username
        email
      }
    }
  }
  ```

- **Add User**: Use the addUser mutation to create a new user.

  Example query:
  ```graphql
  mutation {
    addUser(username: "newuser", email: "newuser@example.com", password: "password") {
      token
      user {
        username
        email
      }
    }
  }
  ```

- **Save a Book**: Use the saveBook mutation to save a book to the user's collection.

  Example query:
  ```graphql
  mutation {
    saveBook(
      authors: ["Author 1", "Author 2"],
      description: "Book description",
      title: "Book Title",
      bookId: "book-id",
      image: "book-image-url",
      link: "book-link"
    ) {
      username
      savedBooks {
        title
        bookId
      }
    }
  }
  ```

- **Remove a Book**: Use the removeBook mutation to remove a saved book from the collection.

  Example query:
  ```graphql
  mutation {
    removeBook(bookId: "book-id") {
      username
      savedBooks {
        title
        bookId
      }
    }
  }
  ```

### **Frontend Usage**

- **Search Books**: Use the search functionality in the UI to find books by title, author, or other filters.

- **Favorite Books**: Click on a book to add it to your list of saved books.

- **View Saved Books**: Navigate to the "Saved Books" section to view all the books you have saved.

## **Contributing**

We welcome contributions! If you have any suggestions or would like to contribute:

1. Fork the repository.
2. Create a new branch for your changes (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## **License**

This project is licensed under the MIT License - see the LICENSE file for details.
