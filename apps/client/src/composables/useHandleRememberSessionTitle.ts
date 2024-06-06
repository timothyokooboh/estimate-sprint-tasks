import { SESSION_TITLE } from '@/constants'

export const useHandleRememberSessionTitle = () => {
  const handleRememberSessionTitle = (remember: boolean, title: string) => {
    if (remember) {
      saveTitle(title)
    } else {
      forgetTitle()
    }
  }

  const saveTitle = (sessionTitle: string) => {
    localStorage.setItem(SESSION_TITLE, sessionTitle)
  }

  const forgetTitle = () => {
    localStorage.removeItem(SESSION_TITLE)
  }

  return {
    handleRememberSessionTitle
  }
}
