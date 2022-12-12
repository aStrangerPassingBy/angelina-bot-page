<script setup lang="ts">
  import { computed } from 'vue';
  import useGlobalStore from '@/stores'
  import zhCn from "element-plus/es/locale/lang/zh-cn";
  import en from "element-plus/es/locale/lang/en";

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
