import { useJoinSessionFormValidation } from '@/composables/useJoinSessionFormValidation'
import { useJoinSessionMutation } from '@/composables/useJoinSessionMutation'
import { useHandleRememberParticipantName } from '@/composables/useHandleRememberParticipantName'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

export const useJoinSession = () => {
  const router = useRouter()
  const route = useRoute()
  const isModalOpen = ref(true)

  const { name, nameAttrs, rememberName, rememberNameAttrs, errors, values, handleSubmit } =
    useJoinSessionFormValidation()

  const { handleRememberParticipantName } = useHandleRememberParticipantName()

  const { joinSession, joiningSession, onJoinedSession } = useJoinSessionMutation()

  const submit = handleSubmit((values) => {
    joinSession({ input: { name: values['name'], sessionId: route.params.sessionId } })
    handleRememberParticipantName(values['rememberName'], values['name'])
  })

  onJoinedSession((result) => {
    const { joinSession: participant } = result.data
    router.push({
      name: 'SessionView',
      params: { sessionId: route.params.sessionId, participantId: participant.id }
    })
  })

  return {
    name,
    nameAttrs,
    rememberName,
    rememberNameAttrs,
    errors,
    values,
    submit,
    loading: joiningSession,
    isModalOpen
  }
}
