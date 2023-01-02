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
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside>
        <ASide></ASide>
      </el-aside>
      <el-main>
        <header class="el-main-header">
          <h1>{{ title }}</h1>
        </header>
        <section class="el-main-content">
          <Main></Main>
          <tabs v-if="router.currentRoute.value.meta.hasChildren"></tabs>
        </section>
      </el-main>
    </el-container>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.el-container {
  display: flex;
  width: 100%;
  height: 100%;
  .el-header {
    height: 60px;
    padding: unset;
  }
  .el-aside {
    width: 20%;
    max-width: 200px;
  }
  .el-main {
    box-sizing: border-box;
    padding: 10px;
    overflow: unset;
    overflow-x: hidden;
    .el-main-header {
      margin: 10px;
    }
    .el-main-content {
      display: flex;
    }
  }
  .el-footer {
    height: 40px;
    padding: unset;
  }
}
</style>