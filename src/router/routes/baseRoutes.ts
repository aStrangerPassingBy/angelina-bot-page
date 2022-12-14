
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
    component: () => import('@/views/base/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/layout/layout.vue'),
    children: [

    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/notFound.vue')
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