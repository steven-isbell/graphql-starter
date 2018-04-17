const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const axios = require("axios");

const BASE_URL = "http://www.swapi.co";

function getFilms(url) {
  return axios.get(url).then(response => response.data);
}

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields() {
    return {
      title: {
        type: GraphQLString,
        resolve(movie) {
          return movie.title;
        }
      },
      releaseDate: {
        type: GraphQLString,
        resolve(movie) {
          return movie.release_date;
        }
      }
    };
  }
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields() {
    return {
      name: {
        type: GraphQLString,
        resolve(person) {
          return person.name;
        }
      },
      height: {
        type: GraphQLInt,
        resolve(person) {
          return person.height;
        }
      },
      movies: {
        type: new GraphQLList(MovieType),
        resolve(person) {
          return person.films.map(getFilms);
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields() {
    return {
      person: {
        type: PersonType,
        args: {
          id: { type: GraphQLString }
        },
        resolve(root, args) {
          return axios
            .get(`${BASE_URL}/api/people/${args.id}`)
            .then(response => response.data);
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: Query
});
