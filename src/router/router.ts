import { createRouter, createWebHashHistory } from 'vue-router';
import baseRoutes from './routes/baseRoutes';
import tempRoutes from './routes/tempRoutes';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...baseRoutes,
    ...tempRoutes
  ]
});

export default router;