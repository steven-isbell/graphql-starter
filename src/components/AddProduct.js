import React, { Component } from 'react';

class addProduct extends Component {
  state = { properties: ['name', 'price', 'color'] };
  handleTextInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {this.state.properties.map(val => (
          <div key={val}>
            <input
              type="text"
              name={val}
              onChange={this.handleTextInput}
              placeholder={val}
            />
          </div>
        ))}
        <button>Add</button>
        {/* Wrap Our Button in the Add Product Mutation*/}
      </div>
    );
  }
}

export default AddProduct;
