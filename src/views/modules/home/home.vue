<script setup lang='ts'>
import { onMounted } from 'vue';
import notice from './components/notice.vue';
import onlineSituation from './components/onlineSituation.vue'
import fnSituation from './components/fnSituation.vue'

onMounted(() => {

})
</script>

<template>
  <div class="home-box">
    <div class="home-box-left">
      <notice class="notice-box"></notice>
      <onlineSituation class="pie-box"></onlineSituation>
    </div>
    <div class="home-box-right">
      <fnSituation class="bar-box"></fnSituation>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-box {
  width: 100%;
  display: flex;
  // background:  #ecf5ff;
  .notice-box {
    box-sizing: border-box;
    height: 300px;
    width: 500px;
    background: #ccc;
  }
  .pie-box {
    width: 500px;
    height: 500px;
  }
  .bar-box {
    width: 600px;
    height: 800px;
  }
}
</style>