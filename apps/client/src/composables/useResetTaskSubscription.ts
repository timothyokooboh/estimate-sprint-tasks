import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'
import { useToast } from '@/components/ui/toast'

export const useResetTaskSubscription = () => {
  const route = useRoute()
  const { toast } = useToast()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result } = useSubscription(gql`
    subscription {
      taskReset {
        id
        title
      }
    }
  `)

  watch(result, () => {
    console.log('Done deal')
    refetch({ id: route.params.sessionId as string })
    toast({
      title: 'Task reset',
      description: `A task has been reset`
    })
  })
}
