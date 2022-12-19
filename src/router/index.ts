import router from './router'
import NProgress from "nprogress";
import { AxiosCanceler } from "@/api/axiosCancel";
import { getSessionStorage } from '@/utils/storage';
// import useGlobalStore from '@/stores'

NProgress.configure({
	easing: "ease", // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: true, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3 // 初始化时的最小百分比
});

const axiosCanceler = new AxiosCanceler();

router.beforeEach((to, from, next) => {
  NProgress.start();
	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();
  
  // const globalStore = useGlobalStore();
  if(!getSessionStorage('token') && to.path != '/login' && to.path != '/404') {
    next({
      path: '/login'
    })
  } else {
    next();
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
