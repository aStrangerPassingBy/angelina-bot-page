import router from './router'
import useGlobalStore from '@/stores'

router.beforeEach((to, from, next) => {
  console.log(to, from);
  
  const globalStore = useGlobalStore();
  if(!globalStore.token && to.path != '/login' && to.path != '/404') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})

export default router;
