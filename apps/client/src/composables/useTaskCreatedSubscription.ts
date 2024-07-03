import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { onUnmounted, watch } from 'vue'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useTaskCreatedSubscription = () => {
  const route = useRoute()
  const { refetch, variables } = useViewSession(route.params.sessionId as string)
  const { toast } = useToast()
  const { result, stop } = useSubscription(gql`
    subscription {
      taskCreated {
        id
        title
      }
    }
  `)

  watch(result, () => {
    console.log(refetch)
    // variables.value = { id: route.params.sessionId as string }
    refetch({ id: route.params.sessionId as string })
    toast({
      title: 'New task',
      description: `New task added`
    })
  })

  onUnmounted(() => {
    stop()
  })
}
