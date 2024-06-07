import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGetSession } from './useGetSession'

export const useSessionView = () => {
  const route = useRoute()
  const { session, loading } = useGetSession(route.params.sessionId as string)

  const participants = computed(() => {
    return session.value?.session.participants || []
  })

  const tasks = computed(() => {
    return session.value?.session.tasks || []
  })

  const currentUser = computed(() => {
    return participants.value.find(
      (participant: { id: string }) => participant.id == route.params.participantId
    )
  })

  const isModerator = computed(() => {
    return session.value?.session.moderator.id === currentUser.value?.id
  })

  return {
    session,
    participants,
    tasks,
    isModerator,
    currentUser,
    loading
  }
}
