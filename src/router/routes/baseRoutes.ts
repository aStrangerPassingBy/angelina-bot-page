
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
    component: () => import('@/views/base/login/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      titleCn: "首页",
      titleEn: "Home",
    },
    component: () => import('@/views/base/home/home.vue')
  },
  {
    path: '/403',
    name: 'NoPermission',
    component: () => import('@/views/error/noPermission.vue')
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