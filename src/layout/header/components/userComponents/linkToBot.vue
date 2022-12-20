<script setup lang='ts'>
import { reactive } from 'vue';

const formData = reactive({
  qq: ''
})
</script>

<template>
  <el-form :model="formData" label-width="60px">
    <el-form-item label="qq">
      <el-input v-model="formData.qq"/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang='scss'>

</style>