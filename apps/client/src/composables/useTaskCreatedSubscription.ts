import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useTaskCreatedSubscription = () => {
  const route = useRoute()
  const { refetch } = useViewSession(route.params.sessionId as string)
  const { toast } = useToast()
  const { result } = useSubscription(gql`
    subscription {
      taskCreated {
        id
        title
      }
    }
  `)

  watch(result, () => {
    refetch({ id: route.params.sessionId as string })
    toast({
      title: 'New task',
      description: `New task added`
    })
  })
}