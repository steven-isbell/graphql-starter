const typeDefs = `
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
`;

module.exports = typeDefs;
