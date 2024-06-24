import { useSubscription } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { watch } from 'vue'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'vue-router'

export const useEndSessionSubscription = () => {
  const router = useRouter()
  const { toast } = useToast()

  const { result } = useSubscription(gql`
    subscription {
      sessionEnded
    }
  `)

  watch(result, () => {
    console.log('Done deal', result)
    toast({
      title: 'Session Ended',
      description: 'Moderator has ended the session.'
    })

    setTimeout(() => {
      router.push({ name: 'HomeView' })
    }, 3000)
  })
}
