import { CONSTANTS_ENV } from "@/constants";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: CONSTANTS_ENV.API_BASE_URL,
  cache: new InMemoryCache(),
});

export const GraphQLProvider = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
