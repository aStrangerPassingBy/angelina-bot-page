import router from './router'
import { getSessionStorage } from '@/utils/storage';
// import useGlobalStore from '@/stores'

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  
  // const globalStore = useGlobalStore();
  if(!getSessionStorage('token') && to.path != '/login' && to.path != '/404') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})

export default router;
