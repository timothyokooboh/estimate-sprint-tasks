import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useStartSessionForm = () => {
  const { mutate, loading, onDone } = useMutation(gql`
    mutation createSession($input: CreateSessionInput!) {
      createSession(input: $input) {
        id
        title
      }
    }
  `)

  onDone((result) => console.log(result.data))

  return {
    mutate,
    loading
  }
}
