import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useInviteParticipant = () => {
  const route = useRoute()
  const inviteURL = ref(`localhost:5173/session/${route.params.sessionId}/invite`)

  const { copy, copied } = useClipboard({
    source: inviteURL,
    legacy: true
  })

  const copyToClipboard = () => copy(inviteURL.value)

  return {
    inviteURL,
    copyToClipboard,
    copied
  }
}
