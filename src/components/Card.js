import React from 'react';
// Should do this in a new component
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { GET_PRODUCTS } from './List';

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const cardStyle = {
  height: '300px',
  width: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '3px solid black',
  margin: '5px',
  padding: '10px',
  borderRadius: '3px'
};

const Card = props => (
  <div style={cardStyle}>
    <p>Product:</p>
    <h1>{props.name}</h1>
    <p>{props.price}</p>
    <br />
    <p>{props.color}</p>
    <br />
    <Mutation
      mutation={DELETE_PRODUCT}
      update={(cache, { data: { deleteProduct } }) => {
        let { products } = cache.readQuery({ query: GET_PRODUCTS });
        const updated = products.filter(val => val.id !== deleteProduct);
        cache.writeQuery({
          query: GET_PRODUCTS,
          data: { products: updated }
        });
      }}
    >
      {(deleteProduct, { loading, error }) => (
        <div>
          <div>
            <button
              onClick={() => {
                deleteProduct({ variables: { id: props.id } });
              }}
            >
              Delete
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
          </div>
        </div>
      )}
    </Mutation>
  </div>
);

export default Card;
