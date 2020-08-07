const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const {models, datasource} = require('./datasource')

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    introspection: true,
    playground: false,
    context() {
      return {models, datasource}
    }
})
  
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is runnning on ${url}`);
})