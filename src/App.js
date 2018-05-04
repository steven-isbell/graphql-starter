import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import PeopleQuery from './components/queries/PeopleQuery';
import List from './components/List';

import logo from './logo.png';
import './App.css';

const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' });
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to GraphQL</h1>
          </header>
          <PeopleQuery render={props => <List list={props.people} />} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
