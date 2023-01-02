<script setup lang='ts'>
import { ElMessage } from "element-plus";

const clickDownload = () => {
  ElMessage({
    type: 'info',
    message: '暂未开放'
  })
}
</script>

<template>
  <div class="download-box" @click="clickDownload">
    <!-- <img src="@/assets/images/base/download.svg" alt=""> -->
    {{ $t('header.download') }}
  </div>
</template>

<style scoped lang='scss'>
.download-box {
  user-select: none;
  cursor: pointer;
}
</style>