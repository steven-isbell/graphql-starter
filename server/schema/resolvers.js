// use let because we'll override the value in the delete
let products = require('../model');

const resolvers = {
  Query: {
    products() {
      return products;
    },
    product(_, { id }) {
      return products.find(val => val.id === +id);
    }
  },
  Mutation: {
    addProduct(_, args, req) {
      const id = Math.floor(Math.random() * 100 + 1);
      // add an id and grab all the values from the arguments object
      const item = {
        id,
        ...args
      };
      products.push(item);
      // return the item to cachebust on the frontend
      return item;
    },
    deleteProduct(_, { id }, req) {
      // delete the product we don't need by the id passed back
      products = products.filter(val => val.id !== +id);
      // return id to cachebust on client
      return id;
    }
  }
};

module.exports = resolvers;
