import router from '@/router'
import { getSessionStorage } from "@/utils/storage";
import type { RouteListItem } from '@/router/interface';


// 添加路由表管理
export const useRoutes = () => {
	
  // 根据sessionStorage中的路由添加路由表
  const updateRoutes = () => {
    let routes = getSessionStorage('routes');
    routes = getSessionStorage('routes');
    const modules = import.meta.glob('@/views/modules/*/*.vue');
    routes.forEach((item: RouteListItem) => {
      // 添加一级路由
      router.addRoute({
        path: item.path,
        name: item.name,
        component: () => import('@/layout/layout.vue'),
        meta: {
          id: item.id,
          level: item.level,
          titleCn: item.titleCn,
          titleEn: item.titleEn,
          hasChildren: item.hasChildren,
          componentPath: item.componentPath // 如果有二级路由则为null
        }
      });
      // 如果当前路由有二级路由
      if(item.hasChildren) {
        item.children.forEach((innerItem: RouteListItem) => {
          // 添加二级路由
          router.addRoute(item.name, {
            path: innerItem.path,
            name: innerItem.name,
            component: modules[`/src/views/modules${innerItem.componentPath}.vue`],
            meta: {
              id: innerItem.id,
              level: innerItem.level,
              titleCn: innerItem.titleCn,
              titleEn: innerItem.titleEn,
            }
          });
        });
      }
    });
    router.push({
      path: routes[0].hasChildren ? routes[0].children[0].path : routes[0].path
    })
  }
  
  // 清除所有非基础路由表
  const removeRoutes = () => {
    const removeRoutes = router.getRoutes().filter(item => {
      return item.meta.level != 0
    })
    removeRoutes.forEach(item => {
      router.removeRoute(item.name as string);
    })
  }
	
	return { updateRoutes, removeRoutes };
};