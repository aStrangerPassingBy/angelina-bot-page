<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FormRules } from 'element-plus';

const emits = defineEmits<{
  (e: 'closeDialog'): void
}>()

const i18n = useI18n();

const loading = ref(false);
const formDataRef = ref();
const formData = reactive({
  qq: ''
})

const rules = computed((): FormRules => {
  return {
    qq: [
      {
        required: true,
        message: i18n.t('header.checklinkQQ')
      },
      {
        trigger: 'blur'
      }
    ],
  }
});
const confirm = () => {

}
</script>

<template>
  <div v-loading="loading">
    <el-form :rules="rules" :model="formData" ref="formDataRef" hide-required-asterisk>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="formData.qq" :placeholder="$t('header.linkQQPlaceholder')"/>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button @click="$emit('closeDialog')">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.btn-box {
  display: flex;
  justify-content: center;
}
</style>