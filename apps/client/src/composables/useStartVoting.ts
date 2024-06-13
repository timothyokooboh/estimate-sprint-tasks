import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useStartVoting = () => {
  const {
    mutate: startVoting,
    loading,
    error
  } = useMutation(gql`
    mutation startVoting($input: StartVotingInput!) {
      startVoting(input: $input) {
        id
        title
      }
    }
  `)

  return {
    startVoting,
    loading,
    error
  }
}
