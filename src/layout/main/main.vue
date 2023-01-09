<script setup lang='ts'>
import { computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const modules = import.meta.glob('@/views/modules/*/*.vue');

const currentRoutePath = computed(() => {
  return router.currentRoute.value.matched[0].meta
})

</script>

<template>
  <section class="main-box">
    <template v-if="router.currentRoute.value.meta.hasChildren">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </template>
    <template v-else>
      <component :is="defineAsyncComponent(modules[`/src/views/modules${currentRoutePath.componentPath}.vue`] as any)"></component>
    </template>
  </section>
</template>

<style scoped lang='scss'>
.main-box {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px 10px 0;
  max-width: 1920px;
  height: 100%;
  overflow: auto;
  background-color: #fff;
}
.main-box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}
.main-box::-webkit-scrollbar-thumb {
/*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ccc;
}
.main-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background   : #ededed;
}
</style>