import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useCreateSessionFormValidation } from '@/composables/useCreateSessionFormValidation'
import { useJoinSessionMutation } from '@/composables/useJoinSessionMutation'
import { useHandleRememberSessionTitle } from '@/composables/useHandleRememberSessionTitle'
import { useHandleRememberParticipantName } from '@/composables/useHandleRememberParticipantName'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export const useCreateSession = () => {
  const router = useRouter()
  const { toast } = useToast()
  const isModalOpen = ref(true)

  const {
    sessionTitle,
    sessionTitleAttrs,
    moderatorName,
    moderatorNameAttrs,
    rememberSessionTitle,
    rememberSessionTitleAttrs,
    rememberModeratorName,
    rememberModeratorNameAttrs,
    errors,
    values,
    handleSubmit
  } = useCreateSessionFormValidation()

  const { handleRememberSessionTitle } = useHandleRememberSessionTitle()
  const { handleRememberParticipantName } = useHandleRememberParticipantName()

  const {
    mutate: createSession,
    loading: creatingSession,
    onDone: onCreatedSession
  } = useMutation(gql`
    mutation createSession($input: CreateSessionInput!) {
      createSession(input: $input) {
        id
        title
      }
    }
  `)

  const {
    joinSession: addModerator,
    joiningSession: addingModerator,
    onJoinedSession: onAddedModerator
  } = useJoinSessionMutation()

  const startSession = handleSubmit((values) => {
    createSession({ input: { title: values.sessionTitle } })
  })

  onCreatedSession((result) => {
    const { createSession: session } = result.data
    addModerator({ input: { name: moderatorName.value, sessionId: session.id, isModerator: true } })
    handleRememberSessionTitle(rememberSessionTitle.value!, sessionTitle.value!)
    handleRememberParticipantName(rememberModeratorName.value!, moderatorName.value!)
  })

  onAddedModerator((result) => {
    toast({
      title: 'Success',
      description: 'Your session has been created'
    })

    const { joinSession: participant } = result.data
    router.push({
      name: 'SessionView',
      params: { sessionId: participant.session.id, participantId: participant.id }
    })
  })

  const loading = computed(() => creatingSession.value || addingModerator.value)

  return {
    sessionTitle,
    sessionTitleAttrs,
    moderatorName,
    moderatorNameAttrs,
    rememberSessionTitle,
    rememberSessionTitleAttrs,
    rememberModeratorName,
    rememberModeratorNameAttrs,
    errors,
    values,
    startSession,
    loading,
    isModalOpen
  }
}
