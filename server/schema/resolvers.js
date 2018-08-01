const products = require('../model');

// Can't stick cart on session because graphql won't persist
// the session when using graphiql
let cart = [];

const resolvers = {
  Query: {
    products() {
      return products;
    },
    product(_, { id }) {
      return products.find(val => val.id === +id);
    },
    cart(_, args, req) {
      if (cart.length) return cart;
      else throw new Error('Cart is empty!');
    }
  },
  Mutation: {
    addToCart(_, { id }, req) {
      const item = products.find(val => val.id === +id);
      cart.push(item);
      return cart;
    },
    deleteFromCart(_, { id }, req) {
      cart = cart.filter(val => val.id !== +id);
    }
  }
};

module.exports = resolvers;
