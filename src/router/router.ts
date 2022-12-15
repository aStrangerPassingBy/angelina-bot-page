import { createRouter, createWebHashHistory } from 'vue-router';
import baseRoutes from './routes/baseRoutes';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes
  ]
});

export default router;