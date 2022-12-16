<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { getLocalStorage, setLocalStorage, getBrowserLang, getSessionStorage, } from './utils/utils';

const router = useRouter();
const globalStore = useGlobalStore();

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
  if(getLocalStorage('language')) {
    const lang = getLocalStorage('language');
    globalStore.updateLanguage(lang);
  } else {
    const lang = getBrowserLang();
    setLocalStorage('language', lang)
    globalStore.updateLanguage(lang);
  }
  const routes = getSessionStorage('routes');
  if(routes) {
    const modules = import.meta.glob('@/views/modules/*/*.vue');
    routes.forEach((item: any) => {
      router.addRoute({
        path: item.path,
        name: item.name,
        component: () => import('@/layout/layout.vue'),
        meta: {
          id: item.id,
          titleCn: item.titleCn,
          titleEn: item.titleEn,
          hasChildren: item.hasChildren,
          component: item.component
        }
      });
      if(item.hasChildren) {
        item?.children?.forEach((innerItem: any) => {
          router.addRoute(item.name, {
            path: innerItem.path,
            name: innerItem.name,
            component: modules[`/src/views/modules/${innerItem.component}.vue`],
            meta: {
              id: innerItem.id,
              titleCn: innerItem.titleCn,
              titleEn: innerItem.titleEN,
            }
          });
        });
      }
      router.push({
        path: routes[0].hasChildren ? (routes[0] as any).children[0].path : routes[0].path
      })
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
