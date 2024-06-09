import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useViewSession } from './useViewSession'

export const useSessionView = () => {
  const route = useRoute()
  const { session, loading } = useViewSession(route.params.sessionId as string)

  const participants = computed(() => {
    return session.value?.viewSession.participants || []
  })

  const tasks = computed(() => {
    return session.value?.viewSession.tasks || []
  })

  const currentUser = computed(() => {
    return participants.value.find(
      (participant: { id: string }) => participant.id == route.params.participantId
    )
  })

  const isModerator = computed(() => {
    return session.value?.viewSession.moderator.id === currentUser.value?.id
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
