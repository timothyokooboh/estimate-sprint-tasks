import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useResetVotesMutation = () => {
  const {
    mutate: resetVotes,
    loading,
    error
  } = useMutation(gql`
    mutation resetVotes($input: ResetVotesInput!) {
      resetVotes(input: $input)
    }
  `)

  return { resetVotes, loading, error }
}
