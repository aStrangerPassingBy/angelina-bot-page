<script setup lang='ts'>
import { onMounted } from 'vue'
import { getBotListApi } from '@/api/modules/config/bot'

onMounted(() => {
  getBotListApi().then(res => {
    console.log('getBotListApi', res);
  })
})
</script>

<template>
  <div>
    botManage
  </div>
</template>

<style scoped lang='scss'>

</style>