<script setup lang='ts'>
  import { computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import useGlobalStore from '@/stores';
  import menuList from '@/router/routes/tempRoutes'

  const router = useRouter();
  const globalStore = useGlobalStore()

  const title = computed(() => {
    return function(meta: { titleCn: string; titleEn: string }) {
      console.log(globalStore.language);
      
      switch(globalStore.language) {
        case 'en':
          return meta.titleEn;
        case 'zh':
        default:
          return meta.titleCn;
      }
    }
  })

  watch(
    () => router.currentRoute.value,
    () => {

    },
    {
      immediate: true
    }
  )
</script>

<template>
  <aside class="aside-box">
    <ul class="menu-list">
      <li
        v-for="item in menuList" 
        :class="['menu-list-item', item.path === router.currentRoute.value.matched[0].path ? 'is-active' : '']"
        :key="item.meta.titleCn" 
        @click="router.push(item.children[0].path)">
        {{ title(item.meta) }}
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
    .menu-list-item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
    }
    .is-active, .menu-list-item:hover {
      background: #ecf5ff;
    }
  }
}
</style>