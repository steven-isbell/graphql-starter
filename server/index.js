const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");

const schema = require(`${__dirname}/graphql/schema`);

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.post(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
