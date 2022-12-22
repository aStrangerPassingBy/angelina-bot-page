<script setup lang='ts'>
import { onMounted } from 'vue';
import { getBotBoardApi, getBotListApi, getFuncListApi, getSomeOneFuncListApi } from '@/api/modules/config/bot';
import notice from './components/notice.vue';

onMounted(() => {
  getBotBoardApi().then((res: any) => {
    console.log('getBotBoardApi', res);
  })
  getBotListApi().then((res: any) => {
    console.log('getBotListApi', res);
  })
  getFuncListApi().then((res: any) => {
    console.log('getFuncListApi', res);
  })
  getSomeOneFuncListApi().then((res: any) => {
    console.log('getSomeOneFuncListApi', res);
  })
})
</script>

<template>
  <div class="home-box">
    <notice class="notice-box"></notice>
  </div>
</template>

<style scoped lang='scss'>
.home-box {
  width: 100%;
  .notice-box {
    box-sizing: border-box;
    height: 300px;
    width: 500px;
    background: #ccc;
  }
}
</style>