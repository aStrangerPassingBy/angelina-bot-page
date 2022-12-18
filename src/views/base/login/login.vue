<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import registerForm from './components/registerForm.vue'
import PWForm from './components/PWForm.vue';
import PINForm from './components/PINForm.vue';
import type { RouteListItem } from '@/router/interface';
import { setSessionStorage } from '@/utils/storage';

type EmitObject = {
  token: string,
  routeList: RouteListItem[]
}

const router = useRouter();

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
// 完成注册后，直接使用返回的token登录
const afterRegister = (emitObject: any) => {
  afterLogin(emitObject);
}
const cancelRegister = () => {
  visible.registerVisible = false;
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

// 切换登录方式
const switchLoginType = (type: 'PW' | 'PIN') => {
  loginType.value = type;
}
// 登录成功后回调
const afterLogin = (emitObject: EmitObject) => {
  // 将登录后获取的token和路由表存在pinia和sessionStorage中
  const { routeList, token } = emitObject;
  setSessionStorage('routeList', routeList);
  setSessionStorage('token', token);

  const modules = import.meta.glob('@/views/modules/*/*.vue');
  routeList.forEach((item: RouteListItem) => {
    // 添加一级路由
    router.addRoute({
    path: item.path,
    name: item.name,
    component: () => import('@/layout/layout.vue'),
    meta: {
      id: item.id,
      level: item.level,
      titleCn: item.titleCn,
      titleEn: item.titleEn,
      hasChildren: item.hasChildren,
      children: item.children,
      componentPath: item.componentPath // 如果有二级路由则为null
    }
    });
    // 如果当前路由有二级路由
    if(item.hasChildren) {
      item.children.forEach((innerItem: RouteListItem) => {
        // 添加二级路由
        router.addRoute(item.name, {
          path: innerItem.path,
          name: innerItem.name,
          component: modules[`/src/views/modules${innerItem.componentPath}.vue`],
          meta: {
            id: innerItem.id,
            level: innerItem.level,
            titleCn: innerItem.titleCn,
            titleEn: innerItem.titleEn,
          }
        });
      });
    }
  });
  router.push({
    path: routeList[0].hasChildren ? routeList[0].children[0].path : routeList[0].path
  })
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