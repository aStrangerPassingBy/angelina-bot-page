<script setup lang='ts'>
import { onMounted } from 'vue';
import { getBotBoardApi, getBotListApi, getFuncListApi, getSomeOneFuncListApi } from '@/api/modules/bot';

onMounted(() => {
  getBotBoardApi().then(res => {
    console.log('getBotBoardApi', res);
  })
  getBotListApi().then(res => {
    console.log('getBotListApi', res);
  })
  getFuncListApi().then(res => {
    console.log('getFuncListApi', res);
  })
  getSomeOneFuncListApi().then(res => {
    console.log('getSomeOneFuncListApi', res);
  })
})
</script>

<template>
  <div class="home-box">
    
  </div>
</template>

<style scoped lang='scss'>
.home-box {
  width: 100%;
}
</style>