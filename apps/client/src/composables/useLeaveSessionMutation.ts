import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRouter, useRoute } from 'vue-router'

export const useLeaveSessionMutation = () => {
  const router = useRouter()
  const route = useRoute()
  const {
    mutate: leaveSession,
    onDone,
    loading,
    error
  } = useMutation(gql`
    mutation leaveSession($participant: ID!) {
      leaveSession(participant: $participant) {
        id
        name
      }
    }
  `)

  onDone(() => {
    router.push({ name: 'JoinSession', params: { sessionId: route.params.sessionId } })
  })

  return { leaveSession, loading, error }
}
