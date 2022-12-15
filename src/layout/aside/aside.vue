<script setup lang='ts'>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import tempRoutes from '@/assets/json/common/tempRoutes.json';

const router = useRouter();
const globalStore = useGlobalStore()

const title = computed(() => {
  return function(titleCn: string, titleEn: string) {
    switch(globalStore.language) {
      case 'en':
        return titleEn;
      case 'zh':
      default:
        return titleCn;
    }
  }
})

const currentRouteLevel1 = computed(() => {
  return router.currentRoute.value.matched[0].path;
})
</script>

<template>
  <aside class="aside-box">
    <ul class="menu-list">
      <li
        v-for="item in tempRoutes"
        :key="item.id"
        :class="['menu-list-item', currentRouteLevel1 == item.path ? 'is-active' : '' ]"
        @click="router.push(item.hasChildren ? (item as any).children[0].path : item.path)">
        {{ title(item.titleCn, item.titleEn) }}
      </li>
    </ul>
  </aside>
</template>

<style scoped lang='scss'>
.aside-box {
  padding: 10px;
  .menu-list {
    border: 1px solid rgba(95, 95, 95, 0.1);
    border-radius: 10px;
    overflow: hidden;
    .menu-list-item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      user-select: none;
    }
    .is-active, .menu-list-item:hover {
      background: #ecf5ff;
    }
  }
}
</style>