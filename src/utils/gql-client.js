import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// Todo: use this??
// import { persistCache } from 'apollo3-cache-persist'

let client;

export function getClient() {
  if (!client) {
    const httpLink = createHttpLink({
      uri: '/graphql',
    });
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      // const token = localStorage.getItem('token');
      // TODO: get the token from context or async-storage
      return {
        headers: {
          ...headers,
          authorization: token ? token : "",
        }
      }
    });

    client = new ApolloClient({
      uri: 'http://[redacted]/graphql',
      cache: new InMemoryCache()
      // TODO: Add it here:
      // link: authLink.concat(httpLink),
    });
  }

  return client;
}
