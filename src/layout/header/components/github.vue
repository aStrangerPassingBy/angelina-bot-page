<script setup lang='ts'>
type Props = {
  type: 'text' | 'icon'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'icon'
})
const link = () => {
  window.open('https://github.com/Strelizia02')
}
</script>

<template>
  <div class="github-box" @click="link">
    <img v-show="props.type=='icon'" src="@/assets/images/base/github.svg"  alt="">
    <span v-show="props.type=='text'">github</span>
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