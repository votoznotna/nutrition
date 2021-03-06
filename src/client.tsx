import {
    ApolloClient,
    InMemoryCache
  } from '@apollo/client'

const client = new ApolloClient({
    uri:  `${window.location.protocol}//${window.location.hostname}:4000`,
    cache: new InMemoryCache()
});

export default client
