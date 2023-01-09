<script setup lang='ts'>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores';
import type { RouteListItem } from '@/router/interface';

const router = useRouter();
const globalStore = useGlobalStore();

const tabScroll = ref();

// 当前一级路由下的二级路由列表
const currentTabList = computed((): RouteListItem[] => {
  return router.currentRoute.value.matched[0].meta.children as unknown as RouteListItem[];
})
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
// 切换二级路由
const clickMenu = (e: any, path: string) => {
  tabScroll.value.style.top = e.target.offsetTop + 'px';
  router.push({
    path
  })
}
</script>

<template>
  <div class="tabs-box">
    <div class="tab-scroll" ref="tabScroll"></div>
    <ul>
      <li
        class="tabs-item"
        v-for="item in currentTabList"
        :key="item.id"
        @click="clickMenu($event, item.path)">
        {{ title(item.titleCn, item.titleEn) }}
      </li>
    </ul>
  </div>
  
</template>

<style scoped lang='scss'>
.tabs-box {
  margin-left: 10px;
  position: relative;
  width: 200px;
  ul {
    width: 100%;
    height: 100%;
    li {
      height: 40px;
      line-height: 40px;
      border-left: 3px solid #ccc;
      padding-left: 30px;
      cursor: pointer;
    }
  }
  .tab-scroll {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    width: 3px;
    background: #79bbff;
    transition: top .3s;
  }
}
</style>