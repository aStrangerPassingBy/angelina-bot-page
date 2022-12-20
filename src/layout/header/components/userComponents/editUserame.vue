<script setup lang='ts'>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const formData = reactive({
  username: ''
})
</script>

<template>
  <el-form :model="formData">
    <el-form-item :label="i18n.t('header.newUsername')">
      <el-input v-model="formData.username" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang='scss'>

</style>