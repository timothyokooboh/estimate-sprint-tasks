import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/session/:sessionId/join',
      name: 'JoinSession',
      component: () => import('@/views/JoinSession.vue')
    },
    {
      path: '/session/:sessionId/participant/:participantId',
      name: 'SessionView',
      component: () => import('@/views/SessionView.vue')
    }
  ]
})

export default router
