import React, { Component } from 'react';
// should do this in a new component
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import Card from './Card';

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      id
      name
      color
      price
    }
  }
`;

const listStyle = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

class List extends Component {
  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {({ loading, error, data }) => {
          if (loading) return <h1>Loading Data...</h1>;
          if (error) return <h1>Error :(</h1>;
          return (
            <div style={listStyle}>
              {data.products.map((val, i) => <Card {...val} key={i} />)}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default List;
