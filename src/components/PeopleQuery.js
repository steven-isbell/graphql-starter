import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const QUERY = gql`
  query getPeople {
    people {
      height
      name
      films {
        title
      }
      homeworld {
        name
      }
    }
  }
`;

export default class PeopleQuery extends Component {
  render() {
    return (
      <Query query={QUERY}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <img src="https://media.giphy.com/media/GIEXgLDfghUSQ/giphy.gif" />
              </div>
            );
          if (error)
            return (
              <div>
                <img src="http://www.fico.com/en/blogs/wp-content/uploads/2017/03/Lack-of-Data.gif" />
              </div>
            );
          return <div>{this.props.render(data)}</div>;
        }}
      </Query>
    );
  }
}
