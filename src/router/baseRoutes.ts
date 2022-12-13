import login from '@/views/base/login.vue'
import notFound from '@/views/error/notFound.vue'

export default [
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
  },
  {
    path: '/404',
    name: 'NotFound',
    component: notFound
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: () => {
      return {
        name: 'NotFound'
      }
    }
  }
]