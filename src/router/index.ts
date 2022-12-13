import router from './router'

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  next();
})

export default router;
