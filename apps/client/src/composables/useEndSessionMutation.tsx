import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useEndSessionMutation = () => {
  const {
    mutate: endSession,
    loading,
    error
  } = useMutation(gql`
    mutation endSession($id: ID!) {
      endSession(id: $id) {
        id
        title
      }
    }
  `)

  return { endSession, loading, error }
}
