<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import registerForm from './components/registerForm.vue'
import PWForm from './components/PWForm.vue';
import PINForm from './components/PINForm.vue';
import tempRoutes from '@/assets/json/common/tempRoutes.json';

const router = useRouter();
const globalStore = useGlobalStore();

const loading = ref<boolean>(false);
const visible = reactive({
  registerVisible: false,
  PINVisible: false
});

// 注册账号
const register = () => {
  visible.registerVisible = true;
};
// 验证码登录
const PIN = () => {
  visible.PINVisible = true;
}
// 切换语言后重置表单
const afterSwitch = () => {
  // console.log(PWForm.setup.reset());
  
}
const updateLoading = (state: boolean) => {
  loading.value = state;
}
// 
const afterLogin = (returnObject: any) => {
  loading.value = false;
  globalStore.setToken(returnObject.token);
  const modules = import.meta.glob('@/views/modules/*/*.vue');
  tempRoutes.forEach(item => {
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
      item?.children?.forEach(innerItem => {
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
</script>

<template>
  <div class="login-page">
    <div class="login-box" v-loading="loading">
      <nav class="login-nav">
        <div class="login-nav-left">
          <el-button size="small" @click="register">{{ $t('login.register') }}</el-button>
          <el-button size="small" @click="PIN">PIN</el-button>
        </div>
        <div class="login-nav-right">
          <Language @after-switch="afterSwitch"></Language>
        </div>
      </nav>
      <header class="login-header">
        <img src="@/assets/images/base/logo.svg" alt="">
        <h1>title-login</h1>
      </header>
      <!-- <component :is="loginType" @afterLogin="afterLogin"></component> -->
      <PWForm @afterLogin="afterLogin" @updateLoading="updateLoading"></PWForm>
      <!-- <PINForm></PINForm> -->
    </div>
  </div>
  <el-dialog
    v-model="visible.registerVisible"
    :title="$t('login.register')"
    :close-on-click-modal="false"
    width="30%">
    <registerForm></registerForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible.registerVisible = false">{{ $t('login.cancel') }}</el-button>
        <el-button type="primary" @click="visible.registerVisible = false">
          {{ $t('login.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="visible.PINVisible"
    :title="$t('login.register')"
    :close-on-click-modal="false"
    width="30%">
    <PINForm></PINForm>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible.PINVisible = false">{{ $t('login.cancel') }}</el-button>
        <el-button type="primary" @click="visible.PINVisible = false">
          {{ $t('login.confirm') }}
        </el-button>
      </span>
    </template>
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
      }
    }
  }
}
</style>