<script setup lang="ts">
import { onMounted } from 'vue';
import { getSomeOneFuncListApi, getBotListApi } from '@/api/modules/console';
import tokenSituation from './components/tokenSituation.vue';

onMounted(() => {
  getSomeOneFuncListApi().then(res => {
    console.log('getSomeOneFuncListApi', res);
  })
  getBotListApi().then(res => {
    console.log('getBotListApi', res);
  })
})
</script>

<template>
  <div class="console-box">
    <div class="console-box-left">
      <div class="box-item">item</div>
    </div>
    <div class="console-box-right">
      <tokenSituation></tokenSituation>
    </div>
  </div>
</template>

<style scoped lang="scss">
.console-box {
  display: flex;
  width: 100%;
  :nth-child(n) {
    width: 50%;
  }
}
</style>