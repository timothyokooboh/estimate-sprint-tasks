import { REMEMBER_SESSION_TITLE } from '@/constants'
import { useStorage } from '@vueuse/core'

export const useHandleRememberSessionTitle = () => {
  const handleRememberSessionTitle = (remember: boolean, title?: string) => {
    if (remember && title) {
      saveTitle(title)
    }

    if (!remember) {
      forgetSessionTitle()
    }
  }

  const saveTitle = (sessionTitle: string) => {
    localStorage.setItem(REMEMBER_SESSION_TITLE, sessionTitle)
  }

  const forgetSessionTitle = () => {
    localStorage.removeItem(REMEMBER_SESSION_TITLE)
  }

  return {
    handleRememberSessionTitle
  }
}
