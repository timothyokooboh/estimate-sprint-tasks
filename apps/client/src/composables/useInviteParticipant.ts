import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useInviteParticipant = () => {
  const route = useRoute()
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5173'
      : 'https://sprintpoker-beta.vercel.app'
  const inviteURL = ref(`${baseUrl}/session/${route.params.sessionId}/join`)

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
