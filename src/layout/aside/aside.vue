<script setup lang='ts'>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores';
import type { RouteListItem } from '@/router/interface';

const router = useRouter();
const globalStore = useGlobalStore();

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

// 当前路由的一级路由
const currentRoute = computed(() => {
  return router.currentRoute.value.matched[0].path;
})

const routeList = computed(() => {
  if(globalStore.isLogin) {
    return [...globalStore.baseRouteList, ...globalStore.routeList];
  } else {
    return globalStore.baseRouteList;
  }
})
</script>

<template>
  <aside class="aside-box">
    <ul class="menu-list">
      <li
        v-for="item in routeList"
        :key="item.id"
        :class="['menu-list-item', currentRoute == item.path ? 'is-active' : '' ]"
        @click="router.push(item.hasChildren ? item.children[0].path : item.path)">
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