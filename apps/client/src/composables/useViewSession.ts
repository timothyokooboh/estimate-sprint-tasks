import { useToast } from '@/components/ui/toast'
import { PARTICIPANT_STATUS, type Participant } from '@/types'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useViewSession = (sessionId: string) => {
  const route = useRoute()
  const router = useRouter()
  const { toast } = useToast()

  const { result, refetch, loading, variables } = useQuery(
    gql`
      query viewSession($id: ID) {
        viewSession(id: $id) {
          id
          createdAt
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

  // Handle a use case where participants visit a session that no longer exists.
  watch(result, (data) => {
    if (!data.viewSession) {
      setTimeout(() => {
        router.push({
          name: 'HomeView'
        })
      }, 1000)

      toast({
        title: 'Session not found',
        description:
          'This session no longer exists. Kindly create a new one and invite other participants.',
        variant: 'destructive'
      })
    }
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
