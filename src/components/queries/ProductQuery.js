import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      name
      color
      price
    }
  }
`;

export default class ProductQuery extends Component {
  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <img
                  src="https://media.giphy.com/media/GIEXgLDfghUSQ/giphy.gif"
                  alt="loading"
                />
              </div>
            );
          if (error)
            return (
              <div>
                <img
                  src="http://www.fico.com/en/blogs/wp-content/uploads/2017/03/Lack-of-Data.gif"
                  alt="error"
                />
              </div>
            );
          return <div>{this.props.render(data)}</div>;
        }}
      </Query>
    );
  }
}
