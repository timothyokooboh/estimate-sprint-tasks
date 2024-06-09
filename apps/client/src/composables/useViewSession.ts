import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useViewSession = (sessionId: string, participantId?: string) => {
  const { result, loading } = useQuery(
    gql`
      query getSession($id: ID!) {
        viewSession(id: $id) {
          title
          status
          tasks {
            id
            title
            averageVote
            status
          }
          moderator {
            id
            name
          }

          participants {
            id
            name
            status
            votes {
              id
              value
              time
              taskId
            }
          }
        }
      }
    `,
    {
      id: sessionId
    }
  )

  const participants = computed(() => {
    return result.value?.viewSession.participants || []
  })

  const tasks = computed(() => {
    return result.value?.viewSession.tasks || []
  })

  const currentUser = computed(() => {
    return participants.value.find((participant: { id: string }) => participant.id == participantId)
  })

  const isModerator = computed(() => {
    return result.value?.viewSession.moderator.id === currentUser.value?.id
  })

  return {
    loading,
    session: result,
    participants,
    tasks,
    isModerator,
    currentUser
  }
}
