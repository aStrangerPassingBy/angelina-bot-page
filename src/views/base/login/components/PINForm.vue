<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores';
import { ElMessage, ElMessageBox } from 'element-plus'
import { creatCaptchaApi, captchaApi } from '@/api/common';
import type { FormRules } from 'element-plus';
import adminRoutes from '@/assets/json/common/tempAdminRoutes.json';
import commonRoutes from '@/assets/json/common/tempCommonRoutes.json';

const emits = defineEmits<{
  // 登录成功后会掉
  (e: 'afterLogin', returnObject: any): void,
  // 更新父组件loading状态
  (e: 'updateLoading', status: boolean): void
}>()

type LoginForm = {
  qq: string,
}
const i18n = useI18n();
const globalStore = useGlobalStore();

const loginFormRef = ref();
const formData = reactive<LoginForm>({
  qq: '',
});

const rules = computed(():FormRules => {
  return {
    qq: [
      {
        required: true,
        message: i18n.t('login.checkBotQQ')
      },
      {
        trigger: 'blur'
      }
    ],
  }
})

const reset = () => {
  loginFormRef.value.resetFields();
};
// 登录
const verify = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if(valid) {
      emits('updateLoading', true);
      const params = {
        qq: formData.qq
      };
      try {
        const creatCaptchaResult = await creatCaptchaApi(params);
        const messageBoxResult = await ElMessageBox.confirm(`给qq${formData.qq}发送验证码${creatCaptchaResult.data}`, {
          confirmButtonText: '我已发送',
          cancelButtonText: '取消',
        })
        if(messageBoxResult === 'confirm') {
          const checkCaptchaResult = await captchaApi(params);
          if(!checkCaptchaResult.data.ok) {
            ElMessage({
              type: 'error',
              message: checkCaptchaResult.data.text
            })
          } else {
            if(checkCaptchaResult.data?.userInfo.isAdmin) {
              const userInfo = checkCaptchaResult.data.userInfo;
              globalStore.updateLogin(true);
              globalStore.updateUserInfo(userInfo);
              globalStore.updateRouteList(adminRoutes as any);
              globalStore.setToken(checkCaptchaResult.data.token);
            } else {
              const userInfo = checkCaptchaResult.data.userInfo;
              globalStore.updateLogin(true);
              globalStore.updateUserInfo(userInfo);
              globalStore.updateRouteList(commonRoutes as any);
              globalStore.setToken(checkCaptchaResult.data.token);
            }
          }
        }
      } catch(error) {
        console.log('error', error);
        ElMessage({
          type: 'error',
          message: '登录失败'
        })
      }
      emits('updateLoading', false);
    }
  })
};

defineExpose({
  reset
});
</script>

<template>
  <main class="login-form">
    <el-form :rules="rules" :model="formData" ref="loginFormRef">
      <el-form-item prop="qq">
        <el-input v-model="formData.qq" :placeholder="$t('login.botQQPlaceholder')" prefix-icon="User" size="large"></el-input>
      </el-form-item>
    </el-form>
  </main>
  <footer class="login-footer">
    <el-button icon='CircleClose' round size="large" @click="reset">{{ $t('login.reset') }}</el-button>
    <el-button icon='CircleCheck' round size="large" @click="verify">{{ $t('login.verify') }}</el-button>
  </footer>
</template>

<style scoped lang='scss'>
.login-form {
  margin: 30px 100px;
}
.login-footer {
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
}
</style>