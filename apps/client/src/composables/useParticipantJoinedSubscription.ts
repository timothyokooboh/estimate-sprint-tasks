import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useParticipantJoinedSubscription = () => {
  const route = useRoute()
  const { toast } = useToast()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result } = useSubscription(gql`
    subscription ParticipantJoined {
      participantJoined {
        id
        name
        status
        isModerator
        session {
          id
          title
        }
        votes {
          id
          value
          time
          taskId
        }
      }
    }
  `)

  watch(result, (data) => {
    const newParticipant = data.participantAdded
    refetch({ id: newParticipant?.session?.id })
    toast({
      title: 'New Member',
      description: `${newParticipant.name} joined the call`
    })
  })
}
