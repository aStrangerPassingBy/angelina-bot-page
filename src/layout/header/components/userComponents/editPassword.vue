<script setup lang='ts'>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n()

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const labelWidth = computed(() => {
  switch(i18n.locale.value) {
    case 'en' :
      return '135px';
    case 'zh': 
    default: 
      return '80px'
  }
})
</script>

<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item :label="i18n.t('header.oldPassword')">
      <el-input v-model="formData.oldPassword" />
    </el-form-item>
    <el-form-item :label="i18n.t('header.newPassword')">
      <el-input v-model="formData.newPassword" />
    </el-form-item>
    <el-form-item :label="i18n.t('header.confirmPassword')">
      <el-input v-model="formData.confirmPassword" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang='scss'>

</style>