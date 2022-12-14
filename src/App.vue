<script setup lang="ts">
  import { computed } from 'vue';
  import useGlobalStore from '@/stores'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'

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
</script>

<template>
  <el-config-provider :local="i18nLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss" scoped>

</style>
