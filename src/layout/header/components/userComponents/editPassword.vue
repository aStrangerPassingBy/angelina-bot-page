<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores'
import { ElMessageBox, ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { editUserPWDApi } from '@/api/common/user'
import { getRsaPassword } from '@/utils/rsaEncrypt';

const emits = defineEmits<{
  (e: 'closeDialog'): void
}>()

const i18n = useI18n();
const globalStore = useGlobalStore();

const loading = ref(false);
const formDataRef = ref();
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const labelWidth = computed(() => {
  switch(i18n.locale.value) {
    case 'en' :
      return '135px';
    case 'zh': 
    default: 
      return '80px'
  }
})

const rules = computed(():FormRules => {
  return {
    oldPassword: [
      {
        required: true,
        message: i18n.t('header.checkOldPassword')
      },
      {
        trigger: 'blur'
      }
    ],
    newPassword: [
      {
        required: true,
        message: i18n.t('header.checkNewPassword')
      },
      {
        trigger: 'blur'
      }
    ],
    confirmPassword: [
      {
        validator: confirmPasswordEnter,
        trigger: 'change'
      }
    ]
  }
})

const confirmPasswordEnter = (rule: any, value: any, callback: any) => {
  if(value === '') {
    callback(new Error(i18n.t('header.checkNewPassword')))
  } else if(value !== formData.newPassword) {
    callback(new Error(i18n.t('header.InconsistentPassword')))
  } else {
    callback()
  }
}

const confirm = () => {
  formDataRef.value.validate((valid: boolean) => {
    if(valid) {
      ElMessageBox.confirm(i18n.t('header.confirmEditPassword'), {
        confirmButtonText: i18n.t('header.confirm'),
        cancelButtonText: i18n.t('header.cancel'),
      }).then(() => {
        loading.value = true;
        const publicKey = globalStore.publicKey;
        const params = {
          oldPwd: getRsaPassword(publicKey, formData.oldPassword),
          newPwd: getRsaPassword(publicKey, formData.newPassword),
        }
        editUserPWDApi(params).then((res: any) => {
          console.log('更改成功', res);
          ElMessage({
            type: 'success',
            message: 'succeed'
          })
          loading.value = false;
          emits('closeDialog');
        }).catch((err: any) => {
          console.log('更改失败', err);
          ElMessage({
            type: 'error',
            message: 'failed'
          })
          loading.value = false;
        })
      }).catch(() => {})
    }
  });
}
</script>

<template>
  <div v-loading="loading">
    <el-form :rules="rules" :model="formData" ref="formDataRef" :label-width="labelWidth" hide-required-asterisk>
      <el-form-item :label="i18n.t('header.oldPassword')" prop="oldPassword">
        <el-input v-model="formData.oldPassword" :placeholder="$t('header.oldPasswordPlaceholder')" />
      </el-form-item>
      <el-form-item :label="i18n.t('header.newPassword')" prop="newPassword">
        <el-input v-model="formData.newPassword" :placeholder="$t('header.newPasswordPlaceholder')" />
      </el-form-item>
      <el-form-item :label="i18n.t('header.confirmPassword')" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword" :placeholder="$t('header.newPasswordPlaceholder')" />
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