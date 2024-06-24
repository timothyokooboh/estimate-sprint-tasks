import { PARTICIPANT_STATUS, type Participant } from '@/types'
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useViewSession = (sessionId: string) => {
  const route = useRoute()
  // const enabled = ref(false)
  const { result, loading, refetch, variables } = useQuery(
    gql`
      query getSession($id: ID!) {
        viewSession(id: $id) {
          id
          title
          status
          estimationMode
          currentTaskId
          tasks {
            id
            title
            averageVote
            status
            votes {
              value
              participant {
                name
              }
            }
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

  const estimationMode = computed(() => session.value?.estimationMode)

  const participants = computed(() => {
    return session.value?.participants || []
  })

  const activeParticipants = computed(() => {
    return participants.value?.filter(
      (participant: Participant) => participant.status === PARTICIPANT_STATUS['ACTIVE']
    )
  })

  const tasks = computed(() => {
    return session.value?.tasks || []
  })

  const currentUser = computed(() => {
    return participants.value.find(
      (participant: { id: string }) => participant.id == route.params.participantId
    )
  })

  return {
    variables,
    loading,
    refetch,
    session,
    participants,
    activeParticipants,
    tasks,
    estimationMode,
    currentUser
  }
}
