const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const { schema, root } = require(`${__dirname}/graphql/schema`);

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.post(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: false
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
