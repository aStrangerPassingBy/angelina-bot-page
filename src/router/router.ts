import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/views/base/login/login.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return {
          name: 'Login'
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    }
  ]
})

export default router