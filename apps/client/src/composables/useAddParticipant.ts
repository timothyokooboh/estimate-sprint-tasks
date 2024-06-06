import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useAddParticipant = () => {
  const {
    mutate: addParticipant,
    loading,
    onDone
  } = useMutation(gql`
    mutation createParticipant($input: CreateParticipantInput!) {
      createParticipant(input: $input) {
        id
        name
        isModerator
      }
    }
  `)

  return {
    addParticipant,
    addingParticipant: loading,
    onAddedParticipant: onDone
  }
}
