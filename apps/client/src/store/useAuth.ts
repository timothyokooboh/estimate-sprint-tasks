import { defineStore } from 'pinia'
import { googleTokenLogin } from 'vue3-google-login'
import { useGoogleAuthMutation } from '@/composables/useGoogleAuthMutation'
import { ref, computed, onMounted } from 'vue'
import { getObjectProperty } from '@/helpers/getObjectProperty'
import { localEncrypt } from '@/helpers/localEncrypt'

export const useAuth = defineStore('auth', () => {
  const { mutate, loading } = useGoogleAuthMutation()
  const authUser = ref<null | { user: any; token: string }>(null)
  const isLoggedIn = computed(() => !!authUser.value)

  const setAuthUser = () => {
    console.log('mounted')
    const user = localEncrypt.getData('authUser')
    console.log('fetch', user)
    authUser.value = user ? user : null
  }

  const login = async () => {
    const data = await googleTokenLogin()
    const response = await mutate({ access_token: data.access_token })
    authUser.value = getObjectProperty(response, 'data.googleSignIn')
    localEncrypt.saveData('authUser', authUser.value)
  }

  const logout = () => {
    localEncrypt.removeData('authUser')
    authUser.value = null
  }

  onMounted(() => {
    setAuthUser()
  })

  return {
    login,
    logout,
    loading,
    authUser,
    isLoggedIn
  }
})
