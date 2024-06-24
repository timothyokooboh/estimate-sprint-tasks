import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useCastVoteMutation = () => {
  const { mutate: castVote, error } = useMutation(gql`
    mutation castVote($input: CastVoteInput!) {
      castVote(input: $input) {
        id
        value
        taskId
        participantId
      }
    }
  `)

  return {
    castVote,
    error
  }
}
