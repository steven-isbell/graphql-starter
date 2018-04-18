import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_PERSON = id =>
  gql`
    query {
      person(id: id) {
        height
        name
      }
    }
  `;

export const GetPerson = (
  <Query query={GET_PERSON}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error :(</div>;

      return (
        <div>
          <h1>{data.person.name}</h1>
          <h3>{data.person.height} inches</h3>
          {data.person.movies.map(val => {
            return (
              <div key={`${val.title}${Math.random(1)}`}>
                <p>{val.title}</p>
                <p>{val.releaseDate}</p>
              </div>
            );
          })}
        </div>
      );
    }}
  </Query>
);

const GET_PERSON_MOVIES = id =>
  gql`
    query {
      person(id: id) {
        height
        name
        movies {
          title
          releaseDate
        }
      }
    }
  `;
