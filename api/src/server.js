// const { ApolloServer } = require('apollo-server')
// const typeDefs = require('./graphql/schema')
// const resolvers = require('./graphql/resolvers')
// const {models, datasource} = require('./datasource')

// const server = new ApolloServer({
//     cors: true,
//     typeDefs,
//     resolvers,
//     playground: false,
//     context() {
//       return {models, datasource}
//     }
// })
  
// server.listen({ port: 4000 }).then(({ url }) => {
//   console.log(`Server is runnning on ${url}`);
// })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const {models, datasource} = require('./datasource')

const mount = async (app) => {
  app.use(bodyParser.json());
  app.use(cors())
  // app.use(express.static(`${__dirname}/client`));
  // app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
      return {models, datasource}
    }
  });

  const runningPort = process.env.PORT || 90

  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(runningPort);

  console.log(`Server is runnning on port ${runningPort}`);

  // console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());