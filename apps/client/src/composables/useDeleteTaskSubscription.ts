import { useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { onUnmounted, watch } from 'vue'
import { useViewSession } from '@/composables/useViewSession'
import { useRoute } from 'vue-router'
import { useToast } from '@/components/ui/toast'

export const useDeleteTaskSubscription = () => {
  const route = useRoute()
  const { toast } = useToast()
  const { refetch } = useViewSession(route.params.sessionId as string)
  const { result, stop } = useSubscription(gql`
    subscription {
      taskDeleted
    }
  `)

  watch(result, () => {
    refetch({ id: route.params.sessionId as string })
    toast({
      title: 'Task deleted',
      description: 'A task has been deleted'
    })
  })

  onUnmounted(() => {
    stop()
  })
}
