<script setup lang='ts'>
import { ElMessage } from "element-plus";

const clickAbout = () => {
  ElMessage({
    type: 'info',
    message: '暂未开放'
  })
}
</script>

<template>
  <div class="about-box" @click="clickAbout">
    {{ $t('header.about') }}
  </div>
</template>

<style scoped lang='scss'>
.about-box {
  cursor: pointer;
  user-select: none;
}
</style>