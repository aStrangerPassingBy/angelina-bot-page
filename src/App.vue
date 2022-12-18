<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import { getBrowserLang } from './utils/utils';
import { getLocalStorage, setLocalStorage, getSessionStorage } from './utils/storage';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import type { RouteListItem } from '@/router/interface';

const router = useRouter();
const globalStore = useGlobalStore();

// 设置element的语言类型
const i18nLocale = computed((): any => {
  switch(globalStore.language) {
    case "zh":
      return zhCn;
    case 'en':
      return en;
    default: 
      return zhCn;
  }
});

onMounted(() => {
  // 判断本地存储的语言类型，没有则获取当前浏览器的默认语言
  if(getLocalStorage('language')) {
    const lang = getLocalStorage('language');
    globalStore.updateLanguage(lang);
  } else {
    const lang = getBrowserLang();
    setLocalStorage('language', lang);
    globalStore.updateLanguage(lang);
  }
  // 获取本地存储的路由表，如果有路由表则添加到router中
  // 防止刷新页面后路由表消失
  const routeList = getSessionStorage('routeList');
  const modules = import.meta.glob('@/views/modules/*/*.vue');
  if(routeList?.length) {
    routeList.forEach((item: RouteListItem) => {
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
          children: item.children,
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
      path: routeList[0].hasChildren ? (routeList[0] as any).children[0].path : routeList[0].path
    });
  }
})
</script>

<template>
  <el-config-provider :local="i18nLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss" scoped>

</style>
