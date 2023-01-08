<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { useGlobalStore } from '@/stores';
import { useRoutes } from '@/hooks/useRoutes'
import PWForm from './components/PWForm.vue';
import PINForm from './components/PINForm.vue';
import registerForm from './components/registerForm.vue'
import router from '@/router';
import { getRSAPublicKeyApi } from '@/api/common';
import { ElMessage } from 'element-plus';

/* 注册账号 */
const registerVisible = ref(false);
const register = () => {
  registerVisible.value = true;
  afterSwitch();
};
// 完成注册后，直接使用返回的token登录
const afterRegister = () => {
  afterLogin();
};
const cancelRegister = () => {
  registerVisible.value = false;
};

/* 语言切换 */
const afterSwitch = () => {
  try {
    PWFormRef.value.reset();
  } catch (error) {
    PINFormRef.value.reset();
  }
};

/* loading */
const loading = ref<boolean>(false);
const updateLoading = (state: boolean) => {
  loading.value = state;
};

/* 登录 */
const PWFormRef = ref();
const PINFormRef = ref();
const loginType = ref<'PW' | 'PIN'>('PW');
const switchLoginType = (type: 'PW' | 'PIN') => {
  loginType.value = type;
};
// 登录成功后回调
const afterLogin = () => {
  const routes = useRoutes();
  routes.updateRoutes();
  nextTick(() => {
    router.replace({path: '/home'});
  });
};

const globalStore = useGlobalStore();

const initState = () => {
  if(!globalStore.publicKey) {
    loading.value = true;
    getRSAPublicKeyApi().then(res => {
      globalStore.updatePublicKey(res.data);
      console.log(globalStore.publicKey);
      
    }).catch(() => {
      ElMessage({
        type: 'error',
        message: '获取密钥失败'
      })
    }).finally(() => {
      loading.value = false;
    })
  }
}
onMounted(() => {
  initState();
})
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
    <registerForm @cancelRegister="cancelRegister" @afterLogin="afterLogin"></registerForm>
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