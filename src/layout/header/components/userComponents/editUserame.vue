<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { editUserNameApi, getUserInfoApi } from '@/api/common/user'
import { setSessionStorage } from '@/utils/storage';

const emits = defineEmits<{
  (e: 'closeDialog'): void
}>()

const i18n = useI18n();

const loading = ref(false);
const formDataRef = ref();
const formData = reactive({
  username: ''
})

const rules = computed((): FormRules => {
  return {
    username: [
      {
        required: true,
        message: i18n.t('header.checkNewUsername')
      },
      {
        trigger: 'blur'
      }
    ],
  }
})

const confirm = () => {
  formDataRef.value.validate((valid: boolean) => {
    if(valid) {
      ElMessageBox.confirm(`${i18n.t('header.confirmEditUsername')}`, {
        confirmButtonText: `${i18n.t('header.confirm')}`,
        cancelButtonText: `${i18n.t('header.cancel')}`,
      }).then(async () => {
        loading.value = true
        const params = {
          name: formData.username,
        }
        try {
          await editUserNameApi(params);
          ElMessage({
            type: 'success',
            message: 'succeed'
          })
          const res: any = await getUserInfoApi();
          console.log('res', res);
          setSessionStorage('userInfo', res.data);
        } catch(err) {
          console.log('更改失败', err);
          ElMessage({
            type: 'error',
            message: 'failed'
          })
        }
        loading.value = false;
      }).catch(() => {})
    }
  });
}
</script>

<template>
  <div v-loading="loading">
    <el-form :rules="rules" :model="formData" ref="formDataRef" hide-required-asterisk>
      <el-form-item :label="i18n.t('header.newUsername')" prop="username">
        <el-input v-model="formData.username" :placeholder="$t('header.newUsernamePlaceholder')"/>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button @click="$emit('closeDialog')">{{ $t('header.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{ $t('header.confirm') }}</el-button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.btn-box {
  display: flex;
  justify-content: center;
}
</style>