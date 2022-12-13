<script setup lang="ts">
import Header from './header/index.vue'
import Side from './side/index.vue'
import Footer from './footer/index.vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
console.log(router.getRoutes().filter(item => {
  return item.meta.level == 2
}), route);

</script>

<template>
  <div class="layout-box">
    <el-container style="height: 100%; min-height: 576px;">
      <el-header style="padding: unset;">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Side></Side>
        </el-aside>
        <el-main>
          <router-view v-slot="{ Component }">
            <component :is="Component"></component>
          </router-view>
          <el-tabs tab-position="right" style="height: 200px" class="demo-tabs">
            <el-tab-pane label="User">User</el-tab-pane>
            <el-tab-pane label="Config">Config</el-tab-pane>
            <el-tab-pane label="Role">Role</el-tab-pane>
            <el-tab-pane label="Task">Task</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
      <el-footer height="40px" style="padding: unset;">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .layout-box {
    width: 100%;
    height: 100%;
    min-width: 1024px;
    min-height: 576px;
    background: #fff;
  }
</style>