<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  const script404 = document.createElement('script');
  script404.setAttribute('id', 'script404');
  script404.type = 'text/javascript';
  script404.src = 'https://volunteer.cdn-go.cn/404/latest/404.js';
  document.getElementsByTagName('head')[0].append(script404);
})

onBeforeUnmount(() => {
  // let script404 = document.getElementById("script404");
  // script404?.remove();
  // let div404 = document.getElementById("div404");
  // div404?.remove();
})
</script>

<template>
  <div>
    <router-link to="/home">返回首页</router-link>
  </div>
</template>

<style scoped lang='scss'>

</style>