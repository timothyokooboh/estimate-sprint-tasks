import { PARTICIPANT_NAME } from '@/constants'

export const useHandleRememberParticipantName = () => {
  const handleRememberParticipantName = (remember: boolean, name: string) => {
    if (remember) {
      saveName(name)
    } else {
      forgetName()
    }
  }

  const saveName = (name: string) => {
    localStorage.setItem(PARTICIPANT_NAME, name)
  }

  const forgetName = () => {
    localStorage.removeItem(PARTICIPANT_NAME)
  }

  return {
    handleRememberParticipantName
  }
}
