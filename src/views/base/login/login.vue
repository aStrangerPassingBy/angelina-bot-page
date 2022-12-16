<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import registerForm from './components/registerForm.vue'
import PWForm from './components/PWForm.vue';
import PINForm from './components/PINForm.vue';
import tempRoutes from '@/assets/json/common/tempRoutes.json';
import { setSessionStorage } from '@/utils/utils';

const router = useRouter();
const globalStore = useGlobalStore();

const PWFormRef = ref();
const PINFormRef = ref();
const loading = ref<boolean>(false);
const loginType = ref<'PW' | 'PIN'>('PW')
const visible = reactive({
  registerVisible: false,
});

// 注册账号
const register = () => {
  visible.registerVisible = true;
  afterSwitch();
};
// 切换登录方式
const switchLoginType = (type: 'PW' | 'PIN') => {
  loginType.value = type;
}
// 切换语言后重置表单
const afterSwitch = () => {
  try {
    PWFormRef.value.reset();
  } catch (error) {
    PINFormRef.value.reset();
  }
}
// 更新loading状态
const updateLoading = (state: boolean) => {
  loading.value = state;
}
// 登录成功后回调
const afterLogin = (returnObject: any) => {
  loading.value = false;
  globalStore.setToken(returnObject.token);
  setSessionStorage('routes', returnObject.routes);
  setSessionStorage('token', returnObject.token);
  const modules = import.meta.glob('@/views/modules/*/*.vue');
  returnObject.routes.forEach((item: any) => {
    router.addRoute({
      path: item.path,
      name: item.name,
      component: () => import('@/layout/layout.vue'),
      meta: {
        id: item.id,
        titleCn: item.titleCn,
        titleEn: item.titleEn,
        hasChildren: item.hasChildren,
        component: item.component
      }
    });
    if(item.hasChildren) {
      item?.children?.forEach((innerItem: any) => {
        router.addRoute(item.name, {
          path: innerItem.path,
          name: innerItem.name,
          component: modules[`/src/views/modules/${innerItem.component}.vue`],
          meta: {
            id: innerItem.id,
            titleCn: innerItem.titleCn,
            titleEn: innerItem.titleEN,
          }
        });
      });
    }
  });
  router.push({
    path: tempRoutes[0].hasChildren ? (tempRoutes[0] as any).children[0].path : tempRoutes[0].path
  })
}
const cancelRegister = () => {
  visible.registerVisible = false;
  console.log('cancelRegister');
  
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
    v-model="visible.registerVisible"
    :title="$t('login.register')"
    :close-on-click-modal="false"
    :append-to-body="true"
    width="30%">
    <registerForm @cancelRegister="cancelRegister"></registerForm>
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