<script setup lang='ts'>
import { computed, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const modules = import.meta.glob('@/views/modules/*/*.vue');


const currentRouteLevel1 = computed(() => {
  return router.currentRoute.value.matched[0].meta
})

</script>

<template>
  <main class="main-box">
    <div class="main-box-content">
      <template v-if="router.currentRoute.value.meta.hasChildren">
        <router-view v-slot="{ Component }" class="content">
          <component :is="Component"></component>
        </router-view>
      </template>
      <template v-else>
        <component :is="defineAsyncComponent(modules[`/src/views/modules/${currentRouteLevel1.component}.vue`] as any)"></component>
      </template>
    </div>
  </main>
</template>

<style scoped lang='scss'>
.main-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex: 8;
  background-color: #fff;
  .main-box-content {
    max-height: 70vh;
    overflow: auto;
    padding-right: 5px;
  }
  .main-box-content::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .main-box-content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ccc;
  }
  .main-box-content::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
    }
}
</style>