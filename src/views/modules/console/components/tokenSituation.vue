<script setup lang='ts'>
import { ref, inject, onMounted } from 'vue';
import { getUserPropertyApi } from '@/api/modules/console';

const tokenPie = ref();
const $echarts = inject('$echarts');

const drawPie = () => {
  
}

onMounted(() => {
  getUserPropertyApi().then(res => {
    console.log('getUserPropertyApi', res);
  })
})
</script>

<template>
  <div>
    <div class="token-pie"></div>
  </div>
</template>

<style scoped lang='scss'>
.token-pie {
  width: 300px;
  height: 300px;
}
</style>