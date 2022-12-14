<script setup lang='ts'>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';

import menuList from '@/assets/json/common/tempMenuList.json'

const router = useRouter();
const globalStore = useGlobalStore();

const title = computed(() => {
  switch(globalStore.language) {
    case 'en':
      return router.currentRoute.value.matched[0].meta.titleEn;
    case 'zh':
    default:
      return router.currentRoute.value.matched[0].meta.titleCn;
  }
})

const currentMenuList = computed(() => {
  const item: string = router.currentRoute.value.matched[0].meta.name as string
  return menuList[item]
})

// watch(
//   () => router.currentRoute.value.matched[0].meta.name,
//   (newVal) => {
//     console.log(newVal, menuList, menuList[newVal as string]);
//   }
// )
</script>

<template>
  <main class="main-box">
    <header class="main-box-header">
      <h1>{{ title }}</h1>
    </header>
    <div class="main-box-content">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
      <el-tabs tab-position="right" style="height: 200px" class="demo-tabs">
        <el-tab-pane
          v-for="item in currentMenuList"
          :key="item.title"
          :label="item.title" 
          :name="item.title" >
          {{ item.title }}
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
  
</template>

<style scoped lang='scss'>
.main-box {
  .main-box-content {
    display: flex;
    justify-content: space-between;
  }
  ::v-deep .el-tabs .el-tabs__content {
    display: none;
  }
}
</style>