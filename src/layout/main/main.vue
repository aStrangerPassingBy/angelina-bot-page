<script setup lang='ts'>
import { computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import tempRoutes from '@/assets/json/common/tempRoutes.json'
import tabs from './components/tabs.vue'

const router = useRouter();
const globalStore = useGlobalStore();

const modules = import.meta.glob('@/views/modules/*/*.vue');

const title = computed(() => {
  switch(globalStore.language) {
    case 'en':
      return router.currentRoute.value.matched[0].meta.titleEn;
    case 'zh':
    default:
      return router.currentRoute.value.matched[0].meta.titleCn;
  }
})
const currentRouteLevel1 = computed(() => {
  return router.currentRoute.value.matched[0].meta
})
</script>

<template>
  <main class="main-box">
    <header class="main-box-header">
      <h1>{{ title }}</h1>
    </header>
    <div class="main-box-content">
      <template v-if="router.currentRoute.value.meta.hasChildren">
        <router-view v-slot="{ Component }" class="content">
          <component :is="Component"></component>
        </router-view>
        <tabs></tabs>
      </template>
      <template v-else>
        <component :is="defineAsyncComponent(modules[`/src/views/modules/${currentRouteLevel1.component}.vue`] as any)"></component>
      </template>
    </div>
  </main>
</template>

<style scoped lang='scss'>
.main-box {
  .main-box-content {
    display: flex;
    justify-content: space-between;
    .content {
      flex: 8;
    }
  }
}
</style>