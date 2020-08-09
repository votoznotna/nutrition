import {
    ApolloClient,
    InMemoryCache
  } from '@apollo/client'

const client = new ApolloClient({
    uri:  `${window.location.protocol}//${window.location.hostname}:90/graphql`,
    // uri: '/api',
    cache: new InMemoryCache()
});

export default client
