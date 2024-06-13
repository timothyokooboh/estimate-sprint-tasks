import { useRoute } from 'vue-router'
import { useViewSession } from '@/composables/useViewSession'
import { useSubscription } from '@vue/apollo-composable'
import { watch } from 'vue'
import gql from 'graphql-tag'

export const useVoteCastedSubscription = () => {
  const route = useRoute()
  const { refetch } = useViewSession(route.params.sessionId as string)

  const { result: resultOfCreation } = useSubscription(gql`
    subscription {
      voteCreated {
        id
        value
        participantId
        taskId
      }
    }
  `)

  const { result: resultOfUpdate } = useSubscription(gql`
    subscription {
      voteUpdated {
        id
        value
        participantId
        taskId
      }
    }
  `)

  watch([resultOfCreation, resultOfUpdate], () => {
    refetch({ id: route.params.sessionId as string })
  })
}
