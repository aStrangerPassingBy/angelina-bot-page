<script setup lang="ts">
import { computed, onMounted } from 'vue';
import useGlobalStore from '@/stores';
import { getBrowserLang } from './utils/utils';
import { getLocalStorage, setLocalStorage, getSessionStorage } from './utils/storage';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useRoutes } from '@/hooks/useRoutes'

const routes = useRoutes();
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
  
  if(routeList?.length) {
    routes.updateRoutes();
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
