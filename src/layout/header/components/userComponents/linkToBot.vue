<script setup lang='ts'>
import { ref, reactive, computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox, type FormRules } from 'element-plus';
import { creatCaptchaApi, captchaApi } from '@/api/common';
import { addUserBotApi } from '@/api/common/user';

const emits = defineEmits<{
  (e: 'closeDialog'): void
}>()

const i18n = useI18n();

const loading = ref(false);
const formDataRef = ref();
const formData = reactive({
  qq: ''
})
const $bus: any = inject('$bus');

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
  ElMessageBox.confirm(`确认要绑定qq为${formData.qq}的账号么？`, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  }).then(async () => {
    const params = {
      qq: formData.qq
    };
    loading.value = true;
    const creatCaptchaResult = await creatCaptchaApi(params);
    loading.value = false;
    const messageBoxResult = await ElMessageBox.confirm(`给qq${formData.qq}发送验证码${creatCaptchaResult.data}`, {
      confirmButtonText: '我已发送',
      cancelButtonText: '取消',
    });
    
    if(messageBoxResult === 'confirm') {
      const linkBotResult = await addUserBotApi(params);
      if(!linkBotResult.data.ok) {
        ElMessage({
          type: 'error',
          message: linkBotResult.data.text
        });
      } else {
        ElMessage({
          type: 'success',
          message: linkBotResult.data.text
        });
        $bus.emit('initBotList');
        $bus.emit('initFnSituation');
        emits('closeDialog');
      }
    }
  }).catch(() => {});
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