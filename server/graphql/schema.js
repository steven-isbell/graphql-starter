const { buildSchema } = require('graphql');
const axios = require('axios');

let users = require(`${__dirname}/model`);

function getFilms(url) {
  return axios.get(url).then(({ data }) => new Film(data));
}

class Person {
  constructor({ id, name, height, films, homeworld }) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.films = this.getFilms(films);
    this.homeworld = this.getHomeworld(homeworld);
  }
  getFilms(films) {
    return films[0] ? films.map(getFilms) : [];
  }
  getHomeworld(homeworld) {
    return axios.get(homeworld).then(({ data }) => new Homeworld(data));
  }
}

class Homeworld {
  constructor({ name, population }) {
    this.name = name;
    this.population = population;
  }
}

class Film {
  constructor({ title, release_date }) {
    this.title = title;
    this.releaseDate = release_date;
  }
}

const schema = buildSchema(
  `
  type Person {
    id: Int!
    name: String
    height: Int
    films: [Film]!
    homeworld: Homeworld
  },
  type Homeworld {
    name: String
    population: Int
  },
  type Film {
    title: String
    releaseDate: String
  },
  type Query {
    people: [Person]!
    person(id: Int!): Person
  },
  type Mutation {
    addPerson(id: Int!, name: String!, height: Int!, films: [String!]!, homeworld: String): Person!
    deletePerson(id: Int!): Int
    updatePerson(id: Int!, name: String, height: Int, films: [String], homeworld: String): Person
  }
`
);

// First argument are the arguments, second is the request object
// DB stuff will be used off req like normal. req.app.get('db');
const root = {
  people(_, req) {
    const formatted = users.map(val => new Person(val));
    return formatted;
  },
  person({ id }, req) {
    const selected = users.filter(user => user.id === id)[0];
    if (!selected) throw new Error(`No Person Matched Id: ${id}`);
    return new Person(selected);
  },
  addPerson(person) {
    users.push(person);
    return new Person(users[users.length - 1]);
  },
  deletePerson({ id }) {
    users = users.filter(val => val.id !== id);
    return id;
  },
  updatePerson({ id, name, height, films, homeworld }) {
    const index = users.findIndex(val => val.id === id);
    if (!index) throw new Error(`No Person Matched Id: ${id}`);
    const filtered = users[index];
    const update = {
      ...filtered,
      name: name || filtered.name,
      height: height || filtered.height,
      films: films || filtered.films,
      homeworld: homeworld || filtered.homeworld
    };
    users[index] = update;
    return new Person(users[index]);
  }
};

module.exports = {
  root,
  schema
};
