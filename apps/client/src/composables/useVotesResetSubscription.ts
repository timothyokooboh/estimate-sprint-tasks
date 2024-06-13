import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useVotesResetSubscription = () => {
  const route = useRoute()
  const { toast } = useToast()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result } = useSubscription(gql`
    subscription {
      votesReset
    }
  `)

  watch(result, () => {
    refetch({ id: route.params.sessionId as string })
    toast({
      title: 'Votes reset',
      description: `Votes have been reset`
    })
  })
}
