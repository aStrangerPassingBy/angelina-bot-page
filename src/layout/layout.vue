<script setup lang="ts">
import Header from './header/index.vue'
import Side from './side/index.vue'
import Main from './main/index.vue'
import Footer from './footer/index.vue'
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
          <Main></Main>
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