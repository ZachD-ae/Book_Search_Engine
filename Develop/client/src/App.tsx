import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';


const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', 
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;

