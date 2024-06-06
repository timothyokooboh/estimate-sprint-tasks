import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useCreateSessionForm = () => {
  const {
    mutate: createSession,
    loading,
    onDone
  } = useMutation(gql`
    mutation createSession($input: CreateSessionInput!) {
      createSession(input: $input) {
        id
        title
      }
    }
  `)

  return {
    createSession,
    creatingSession: loading,
    onCreatedSession: onDone
  }
}
