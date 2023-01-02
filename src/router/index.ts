import router from './router'
import NProgress from "nprogress";
import { useGlobalStore } from '@/stores';
import { AxiosCanceler } from "@/api/axiosCancel";
import { visitPageApi } from '@/api/common'

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
  const globalStore = useGlobalStore();
  const params = {
    url: to.path
  }
  visitPageApi(params).then(res => {
    // console.log('埋点', res);
    // * 在跳转路由之前，清除所有的请求(需要更改)
    axiosCanceler.removeAllPending();
    if(!globalStore.token && to.path != '/login' && to.path != '/404' && to.path != '/home') {
      next({
        path: '/login'
      })
    } else {
      next();
    }
  })
})

router.afterEach((to, from) => {
  if(from.path == '/404') {
    location.reload();
  }
  NProgress.done()
})

export default router;
