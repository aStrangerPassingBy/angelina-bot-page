<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores';
import { getRSAPublicKeyApi, loginApi } from '@/api/common';
import { getRsaPassword } from '@/utils/rsaEncrypt';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import adminRoutes from '@/assets/json/common/tempAdminRoutes.json';
import commonRoutes from '@/assets/json/common/tempCommonRoutes.json';

const emits = defineEmits<{
  (e: 'afterLogin'): void,
  (e: 'updateLoading', status: boolean): void
}>();

type LoginForm = {
  username: string,
  password: string,
  // savepassword: boolean
};

const i18n = useI18n();
const globalStore = useGlobalStore();

const loginFormRef = ref();
const formData = reactive<LoginForm>({
  username: '',
  password: '',
  // savepassword: false,
});

const rules = computed((): FormRules => {
  return {
    username: [
      {
        required: true,
        message: i18n.t('login.checkUserName')
      },
      {
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: i18n.t('login.checkPassword')
      },
      {
        trigger: 'blur'
      }
    ]
  }
});

// 重置表单
const reset = () => {
  loginFormRef.value.resetFields();
};
// 密码登录，如果本地没有publicKey则先获取publicKey再登录
const confirm = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if(valid) {
      let params, returnLogin;
      emits('updateLoading', true);
      try {
        params = {
          name: formData.username,
          pwd: getRsaPassword(globalStore.publicKey, formData.password),
        };
        returnLogin = await loginApi(params);
        // 判断是否是管理员账户，设置不同的路由表，然后将用户信息、token存到pinia中
        if(returnLogin.data?.userInfo.isAdmin) {
          const userInfo = returnLogin.data.userInfo;
          globalStore.updateLogin(true);
          globalStore.updateUserInfo(userInfo);
          globalStore.updateRouteList(adminRoutes as any);
          globalStore.setToken(returnLogin.data.token);
        } else {
          const userInfo = returnLogin.data.userInfo;
          globalStore.updateLogin(true);
          globalStore.updateUserInfo(userInfo);
          globalStore.updateRouteList(commonRoutes as any);
          globalStore.setToken(returnLogin.data.token);
        }
        emits('afterLogin');
      } catch(err) {
        console.log('登录失败', err);
        ElMessage({
          type:'error',
          message: '登陆失败'
        })
      }
      emits('updateLoading', false);
    }
  });
};

defineExpose({
  reset
});
</script>

<template>
  <main class="login-form">
    <el-form :rules="rules" :model="formData" ref="loginFormRef">
      <el-form-item prop="username">
        <el-input v-model="formData.username" :placeholder="$t('login.usernamePlaceholder')" prefix-icon="User" size="large"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input @keyup.enter="confirm" v-model="formData.password" :placeholder="$t('login.passwordPlaceholder')" prefix-icon="Lock" size="large" type="password"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="savepassword">
        <el-checkbox v-model="formData.savepassword" :label="$t('login.savePassword')"/>
      </el-form-item> -->
    </el-form>
  </main>
  <footer class="login-footer">
    <el-button icon='CircleClose' round size="large" @click="reset">{{ $t('login.reset') }}</el-button>
    <el-button icon='CircleCheck' round size="large" @click="confirm">{{ $t('login.confirm') }}</el-button>
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