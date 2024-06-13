import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useViewSession = (sessionId: string, participantId?: string) => {
  const { result, loading, refetch } = useQuery(
    gql`
      query getSession($id: ID!) {
        viewSession(id: $id) {
          id
          title
          status
          currentTaskId
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
            isModerator
            vote {
              id
              value
              taskId
            }
            votes {
              id
              value
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

  const session = computed(() => result.value?.viewSession)

  const participants = computed(() => {
    return session.value?.participants || []
  })

  const tasks = computed(() => {
    return session.value?.tasks || []
  })

  const currentUser = computed(() => {
    return participants.value.find((participant: { id: string }) => participant.id == participantId)
  })

  return {
    loading,
    refetch,
    session,
    participants,
    tasks,
    currentUser
  }
}
