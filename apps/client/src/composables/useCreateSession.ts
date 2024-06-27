import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useCreateSessionFormValidation } from '@/composables/useCreateSessionFormValidation'
import { useHandleRememberSessionTitle } from '@/composables/useHandleRememberSessionTitle'
import { useHandleRememberParticipantName } from '@/composables/useHandleRememberParticipantName'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { Participant } from '@/types'

export const useCreateSession = () => {
  const router = useRouter()
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
    estimationMode,
    estimationModeAttrs,
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
        participants {
          id
          isModerator
        }
      }
    }
  `)

  const startSession = handleSubmit((values) => {
    createSession({
      input: {
        title: values.sessionTitle,
        moderator: moderatorName.value,
        estimationMode: values.estimationMode
      }
    })
  })

  onCreatedSession((result) => {
    handleRememberSessionTitle(rememberSessionTitle.value!, sessionTitle.value!)
    handleRememberParticipantName(rememberModeratorName.value!, moderatorName.value!)

    const { createSession: session } = result.data
    const moderator = session.participants.find((user: Participant) => user.isModerator)

    router.push({
      name: 'SessionView',
      params: { sessionId: session.id, participantId: moderator.id }
    })
  })

  return {
    sessionTitle,
    sessionTitleAttrs,
    moderatorName,
    moderatorNameAttrs,
    rememberSessionTitle,
    rememberSessionTitleAttrs,
    rememberModeratorName,
    rememberModeratorNameAttrs,
    estimationMode,
    estimationModeAttrs,
    errors,
    values,
    startSession,
    loading: creatingSession,
    isModalOpen
  }
}
