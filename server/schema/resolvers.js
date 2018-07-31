const users = require('../model');

module.exports = {
  Query: {
    people(parent, args, req) {
      const formatted = users.map(val => new Person(val));
      return formatted;
    },
    person(_, { id }, req) {
      const selected = users.filter(user => user.id === id)[0];
      if (!selected) throw new Error(`No Person Matched Id: ${id}`);
      return new Person(selected);
    },
    addPerson(_, person) {
      users.push(person);
      return new Person(users[users.length - 1]);
    },
    deletePerson(_, { id }) {
      users = users.filter(val => val.id !== id);
      return id;
    },
    updatePerson(_, { id, name, height, films, homeworld }) {
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
  }
};
