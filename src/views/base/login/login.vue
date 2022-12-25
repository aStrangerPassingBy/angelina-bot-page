<script setup lang="ts">
import { ref } from 'vue';
import registerForm from './components/registerForm.vue'
import PWForm from './components/PWForm.vue';
import PINForm from './components/PINForm.vue';
import type { EmitObject } from './interface';
import { setSessionStorage } from '@/utils/storage';
import { useRoutes } from '@/hooks/useRoutes'

/* 注册账号 */
const registerVisible = ref(false);
const register = () => {
  registerVisible.value = true;
  afterSwitch();
};
// 完成注册后，直接使用返回的token登录
const afterRegister = (emitObject: any) => {
  afterLogin(emitObject);
}
const cancelRegister = () => {
  registerVisible.value = false;
}

/* 语言切换 */
const afterSwitch = () => {
  try {
    PWFormRef.value.reset();
  } catch (error) {
    PINFormRef.value.reset();
  }
}

/* loading */
const loading = ref<boolean>(false);
const updateLoading = (state: boolean) => {
  loading.value = state;
}

/* 登录 */
const PWFormRef = ref();
const PINFormRef = ref();
const loginType = ref<'PW' | 'PIN'>('PW')
const switchLoginType = (type: 'PW' | 'PIN') => {
  loginType.value = type;
}
const routes = useRoutes();
// 登录成功后回调
const afterLogin = (emitObject: EmitObject) => {
  // 将登录后获取的token、路由表、用户信息存储在sessionStorage中
  const { routeList, token, userInfo } = emitObject;
  setSessionStorage('routeList', routeList);
  setSessionStorage('token', token);
  setSessionStorage('userInfo', userInfo);
  routes.updateRoutes();
}
</script>

<template>
  <div class="login-page">
    <div class="login-box" v-loading="loading">
      <nav class="login-nav">
        <div class="login-nav-left">
          <el-button size="small" @click="register">{{ $t('login.register') }}</el-button>
          <el-button v-show="loginType === 'PW'" size="small" @click="switchLoginType('PIN')">PIN</el-button>
          <el-button v-show="loginType === 'PIN'" size="small" @click="switchLoginType('PW')">PW</el-button>
        </div>
        <div class="login-nav-right">
          <Language @after-switch="afterSwitch"></Language>
        </div>
      </nav>
      <header class="login-header">
        <img src="@/assets/images/base/logo.svg" alt="">
        <h1>angelina-bot</h1>
      </header>
      <!-- <component :is="loginType" @afterLogin="afterLogin"></component> -->
      <PWForm v-if="loginType == 'PW'" @afterLogin="afterLogin" @updateLoading="updateLoading" ref="PWFormRef"></PWForm>
      <PINForm v-if="loginType == 'PIN'" @afterLogin="afterLogin" @updateLoading="updateLoading" ref="PINFormRef"></PINForm>
    </div>
  </div>
  <el-dialog
    v-model="registerVisible"
    :title="$t('login.register')"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="30%">
    <registerForm @cancelRegister="cancelRegister" @afterRegister="afterRegister"></registerForm>
  </el-dialog>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  width: 100%;
  height: 100%;
  .login-box {
    box-sizing: border-box;
    width: 600px;
    min-width: 600px;
    min-height: 400px;
    border-radius: 5px;
    background: #fff;
    padding: 20px;
    .login-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .login-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px 100px;
      justify-content: space-evenly;
      img {
        width: 100px;
        height: 100px;
        // border-radius: 50%;
      }
    }
  }
}
</style>