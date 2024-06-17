import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'

export const useTaskUpdatedSubscription = () => {
  const route = useRoute()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result } = useSubscription(gql`
    subscription {
      taskUpdated {
        id
        title
        status
      }
    }
  `)

  watch(result, () => {
    refetch({ id: route.params.sessionId as string })
  })
}
