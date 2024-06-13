import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useCastVoteMutation = () => {
  const { mutate: createVote, error } = useMutation(gql`
    mutation createVote($input: CreateVoteInput!) {
      createVote(input: $input) {
        id
        value
        taskId
        participantId
      }
    }
  `)

  const { mutate: updateVote } = useMutation(gql`
    mutation updateVote($input: UpdateVoteInput!) {
      updateVote(input: $input) {
        id
        value
        taskId
        participantId
      }
    }
  `)

  return {
    createVote,
    updateVote,
    error
  }
}
