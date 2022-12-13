import { createRouter, createWebHashHistory } from 'vue-router'
import baseRoutes from './baseRoutes'
import tempRoutes from './tempRoutes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes,
    ...tempRoutes
  ]
})

export default router