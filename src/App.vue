<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue';
import { useGlobalStore } from '@/stores';
import { useRouter } from 'vue-router';
import { getBrowserLang } from './utils/utils';
import { useRoutes } from './hooks/useRoutes';
import { getLocalStorage, setLocalStorage } from './utils/storage';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import en from 'element-plus/dist/locale/en.mjs';

const router = useRouter();
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
  routes.updateRoutes();
  nextTick(() => {
    router.replace({path: '/home'})
  })
})
</script>

<template>
  <el-config-provider :locale="i18nLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss" scoped>

</style>
