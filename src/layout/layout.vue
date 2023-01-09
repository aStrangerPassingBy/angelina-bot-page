<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores';
import Header from './header/header.vue';
import ASide from './aside/aside.vue';
import Main from './main/main.vue';
import Footer from './footer/footer.vue';
import tabs from './tabs/tabs.vue'

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
</script>

<template>
  <el-container class="outer-container">
    <el-header class="outer-container-header">
      <Header></Header>
    </el-header>
    <el-container class="inner-container">
      <el-aside class="inner-container-aside">
        <ASide></ASide>
      </el-aside>
      <el-main class="inner-container-main">
        <header class="inner-container-main-header">
          <h1>{{ title }}</h1>
        </header>
        <section class="inner-container-main-content">
          <Main></Main>
          <tabs v-if="router.currentRoute.value.meta.hasChildren"></tabs>
        </section>
      </el-main>
    </el-container>
    <el-footer class="outer-container-footer">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
// 全局宽高100%
.outer-container {
  display: flex;
  width: 100%;
  height: 100%;
  // 页头60px
  .outer-container-header {
    height: 60px;
    padding: unset;
  }
  // 内盒子为全局高度减页头和页脚
  .inner-container {
    width: 100%;
    height: calc(100% - 60px - 40px);
    .inner-container-aside {
      width: 200px;
    }
    // 内部区域宽度为全局宽度减侧边栏宽度200px
    .inner-container-main {
      box-sizing: border-box;
      padding: 10px;
      width: calc(100% - 200px);
      .inner-container-main-header {
        margin: 10px;
      }
      // 展示区高度为内部区域高度减内部标题高度
      .inner-container-main-content {
        display: flex;
        height: calc(100% - 45px);
      }
    }
  }
  // 页脚40px
  .outer-container-footer {
    height: 40px;
    padding: unset;
  }
}
</style>