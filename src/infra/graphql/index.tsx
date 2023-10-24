import { CONSTANTS_ENV } from "@/constants";
import { IUser } from "@/domain/models";
import { makeLocalSecureStorageAdapter } from "@/main/factories/cache";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const SecureStore = makeLocalSecureStorageAdapter;

const httpLink = createHttpLink({
  uri: CONSTANTS_ENV.API_BASE_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const account: IUser = await SecureStore.get('session');
  const token = account?.access_token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const GraphQLProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
