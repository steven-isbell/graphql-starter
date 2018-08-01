const products = require('../model');
// Can't stick cart on session because graphql won't persist
// the session when using graphiql
let cart = [];
