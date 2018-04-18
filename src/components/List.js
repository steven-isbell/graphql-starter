import React, { Component } from "react";
import Card from "./Card";

const listStyle = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={listStyle}>
        {this.props.list.map((val, i) => <Card {...val} key={i} />)}
      </div>
    );
  }
}

export default List;
