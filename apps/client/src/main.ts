import './index.css'
import 'dropzone-vue/dist/dropzone-vue.common.css'
import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo-setup'
import vue3GoogleLogin from 'vue3-google-login'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})

app.use(pinia)
app.use(router)
app.mount('#app')
