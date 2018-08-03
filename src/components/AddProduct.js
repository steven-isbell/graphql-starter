import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { GET_PRODUCTS } from './List';

export const ADD_PRODUCT = gql`
  mutation addProduct($name: String!, $price: Float!, $color: String!) {
    addProduct(name: $name, price: $price, color: $color) {
      id
      name
      price
      color
    }
  }
`;

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
        <Mutation
          mutation={ADD_PRODUCT}
          update={(cache, { data: { addProduct } }) => {
            let { products } = cache.readQuery({ query: GET_PRODUCTS });
            const updated = products.concat(addProduct);
            cache.writeQuery({
              query: GET_PRODUCTS,
              data: { products: updated }
            });
          }}
        >
          {(addProduct, { loading, error }) => (
            <div>
              <button
                onClick={() => {
                  addProduct({
                    variables: {
                      name: this.state.name,
                      price: this.state.price,
                      color: this.state.color
                    }
                  });
                }}
              >
                Add
              </button>
              {loading && <p>Loading...</p>}
              {error && <p>Error :(</p>}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default AddProduct;
