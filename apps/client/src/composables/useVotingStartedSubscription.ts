import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { onUnmounted, watch } from 'vue'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useVotingStartedSubscription = () => {
  const route = useRoute()
  const { toast } = useToast()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result, stop } = useSubscription(gql`
    subscription {
      votingStarted
    }
  `)

  watch(result, (data) => {
    refetch({ id: route.params.sessionId as string })
    toast({
      title: 'Voting started',
      description: 'Voting has started'
    })
  })

  onUnmounted(() => {
    stop()
  })
}
