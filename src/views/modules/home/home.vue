<script setup lang='ts'>
import { onMounted } from 'vue';
import notice from './components/notice.vue';
import onlineSituation from './components/onlineSituation.vue'
import serverInfo from './components/serverInfo.vue';
import fnSituation from './components/fnSituation.vue'

onMounted(() => {

})
</script>

<template>
  <div class="home-box">
    <div class="home-box-left">
      <notice></notice>
      <onlineSituation class="pie-box"></onlineSituation>
    </div>
    <div class="home-box-right">
      <serverInfo></serverInfo>
      <fnSituation class="bar-box"></fnSituation>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-box {
  width: 100%;
  max-width: 1920px;
  display: flex;
  .home-box-left {
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
    .pie-box {
      width: 500px;
      height: 500px;
    }
  }
  .home-box-right {
    width: 50%;
    .bar-box {
      width: 600px;
      height: 800px;
    }
  }
  
}
</style>