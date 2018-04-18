import React, { Component } from "react";

import PeopleQuery from "./components/queries/PeopleQuery";
import List from "./components/List";

import logo from "./logo.png";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to GraphQL</h1>
        </header>
        <PeopleQuery render={props => <List list={props.people} />} />
      </div>
    );
  }
}

export default App;
