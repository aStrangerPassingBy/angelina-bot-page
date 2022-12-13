<script setup lang='ts'>
import { computed } from 'vue';
import { useRouter, type RouteRecordRaw } from 'vue-router';
import useGlobalStore from '@/stores';
import menuList from '@/router/tempRoutes'

const router = useRouter();
const globalStore = useGlobalStore()

const title = computed(() => {
  return function(meta: { title: string; titleEn: string }) {
    switch(globalStore.language) {
      case 'en':
        return meta.titleEn;
      case 'zh':
      default:
        return meta.title;
    }
  }
})

const jump = (target:RouteRecordRaw) => {
  router.push(target.path)
}
</script>

<template>
  <aside class="aside-box">
    <ul class="menu-list">
      <li class="menu-list-item" v-for="item in menuList" :key="item.meta.title" @click="jump(item.children[0])">{{ title(item.meta) }}</li>
    </ul>
  </aside>
</template>

<style scoped lang='scss'>
  .aside-box {
    padding: 10px;
    .menu-list {
      border: 1px solid rgba(95, 95, 95, 0.1);
      border-radius: 10px;
      .menu-list-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
      }
      .menu-list-item:hover {
        background: #ecf5ff;
      }
    }
  }
</style>