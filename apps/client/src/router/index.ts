import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/session/:sessionId/participant/:participantId',
      name: 'SessionView',
      component: () => import('@/views/SessionView.vue')
    },
    {
      path: '/session/:sessionId/join',
      name: 'JoinSession',
      component: () => import('@/views/JoinSession.vue')
    }
  ]
})

export default router
