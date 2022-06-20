import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import NotFound from 'pages/NotFound/NotFound';
import ProjectPage from 'pages/ProjectPage/ProjectPage';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache,
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/project/:id" element={<ProjectPage />} />
             <Route path="*" element={<NotFound />} />
           </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>

  );
}

export default App;
