import React, { Component } from 'react';

import List from './components/List';
import AddProduct from './components/AddProduct';

import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to GraphQL</h1>
        </header>
        <AddProduct />
        <List />
      </div>
    );
  }
}

export default App;
