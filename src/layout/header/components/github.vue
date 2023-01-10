<script setup lang='ts'>
const link = () => {
  // window.open('https://github.com/Strelizia02');
  window.electronApi.openBrowser('https://github.com/Strelizia02');
}
</script>

<template>
  <div class="github-box">
    <img src="@/assets/images/base/github.svg" @click="link" alt="">
  </div>
</template>

<style scoped lang='scss'>
.github-box {
  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
}
</style>