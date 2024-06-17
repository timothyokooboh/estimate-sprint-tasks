import { useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useToast } from '@/components/ui/toast'

export const useLeaveSessionSubscription = () => {
  const route = useRoute()
  const { refetch } = useViewSession(route.params.sessionId as string)
  const { toast } = useToast()

  const { result } = useSubscription(gql`
    subscription {
      participantLeft {
        id
        name
      }
    }
  `)

  watch(result, (data) => {
    console.log('arguably')
    const newParticipant = data.participantLeft
    toast({
      title: 'Member Left',
      description: `${newParticipant.name} left the call`
    })
    refetch({ id: route.params.sessionId as string })
  })
}
