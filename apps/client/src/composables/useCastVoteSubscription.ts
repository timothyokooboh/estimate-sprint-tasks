import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'

export const useCastVoteSubscription = () => {
  const route = useRoute()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result } = useSubscription(gql`
    subscription {
      voteCasted {
        id
        value
        participantId
        taskId
      }
    }
  `)

  watch(result, () => {
    refetch({ id: route.params.sessionId as string })
  })
}
