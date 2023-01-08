<script setup lang='ts'>
import { onMounted } from 'vue';
import noticeBox from './components/noticeBox.vue';
import onlineSituation from './components/onlineSituation.vue'
import serverInfo from './components/serverInfo.vue';
import fnSituation from './components/fnSituation.vue'

onMounted(() => {

})
</script>

<template>
  <div class="home-box">
    <div class="home-box-left">
      <noticeBox class="notice-box"></noticeBox>
      <onlineSituation class="pie-box"></onlineSituation>
    </div>
    <div class="home-box-right">
      <serverInfo class="serverInfo-box"></serverInfo>
      <fnSituation class="bar-box"></fnSituation>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-box {
  width: 100%;
  height: 100%;
  display: flex;
  .home-box-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    width: 50%;
    .notice-box {
      box-sizing: border-box;
      height: 300px;
      width: 100%;
      background: #ccc;
    }
    .pie-box {
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 310px);
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 5px 5px 5px #888888;
    }
  }
  .home-box-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    width: 50%;
    .serverInfo-box {
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 15px;
      padding-bottom: 0;
      box-shadow: 5px 5px 5px #888888;
    }
    .bar-box {
      box-sizing: border-box;
      width: 100%;
      height: 80%;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 5px 5px 5px #888888;
    }
  }
  
}
</style>