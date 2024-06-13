import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export const useJoinSessionMutation = () => {
  const {
    mutate: joinSession,
    loading,
    onDone
  } = useMutation(gql`
    mutation joinSession($input: JoinSessionInput!) {
      joinSession(input: $input) {
        name
        isModerator
        id
        session {
          id
        }
      }
    }
  `)

  return {
    joinSession,
    joiningSession: loading,
    onJoinedSession: onDone
  }
}
