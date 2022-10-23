import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
//   uri: 'http://localhost:3020/graphql',
    uri: import.meta.env.VITE_GRAPHCMS_ENDPOINT
})

// @see https://www.apollographql.com/docs/react/networking/authentication/
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = import.meta.env.VITE_GRAPHCMS_TOKEN
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    }
  }
});

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

//追加
export default apolloClient;
