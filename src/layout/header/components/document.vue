<script setup lang='ts'>
const link = () => {
  window.open('https://www.angelina-bot.top')
}
</script>

<template>
  <div class="document-box" @click="link">
    {{ $t('header.document') }}
  </div>
</template>

<style scoped lang='scss'>
.document-box {
  cursor: pointer;
  user-select: none;
}
</style>