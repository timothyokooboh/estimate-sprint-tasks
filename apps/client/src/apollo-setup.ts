import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { split, ApolloLink } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { useErrorHandling } from '@/composables/useErrorHandling'

const { errorLink } = useErrorHandling()

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://estimate-sprint-tasks.onrender.com'
})

// Create a GraphQLWsLink link:
const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === 'development'
        ? 'ws://localhost:4000/subscriptions'
        : 'wss://estimate-sprint-tasks.onrender.com/subscriptions'
  })
)

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const interceptViewSessionQuery = new ApolloLink((operation, forward) => {
  const { operationName, variables } = operation

  // Cancel request if 'id' is not present in variables
  if (operationName === 'viewSession' && !variables?.id) {
    console.warn(`Cancelling request for ${operationName} because 'id' is not present`)
    return null
  }
  // If the condition is not met, forward the request
  return forward(operation)
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([interceptViewSessionQuery, errorLink, link]),
  cache
})
