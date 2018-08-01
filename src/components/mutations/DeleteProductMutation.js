import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { GET_PRODUCTS } from '../queries/productQuery';

export const DELETE_PRODUCT = gql`
  mutation deleteFromCart($id: Int!) {
    deleteFromCart(id: $id)
  }
`;

const DeleteProductMutation = props => (
  <Mutation
    mutation={DELETE_PRODUCT}
    update={(cache, { data: { deleteFromCart } }) => {
      let { products } = cache.readQuery({ query: GET_PRODUCTS });
      const updated = products.filter(val => val.id !== deleteFromCart);
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { product: updated }
      });
    }}
  >
    {(deleteFromCart, { loading, error }) => (
      <div>{props.children(loading, error, deleteFromCart)}</div>
    )}
  </Mutation>
);

export default DeleteProductMutation;
