<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import Language from '@/components/common/language.vue'

type LoginForm = {
  username: string,
  password: string,
  savepassword: boolean
}

const i18n = useI18n();
const router = useRouter();

const loading = ref<boolean>(false);
const language = ref<boolean>(false);
const loginFormRef = ref();
const formData = reactive<LoginForm>({
  username: '',
  password: '',
  savepassword: false,
});

// 表单验证规则
const rules = computed(():FormRules => {
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
})

// 注册
const register = () => {
  console.log('注册');
};
// 重置
const reset = () => {
  loginFormRef.value.resetFields();
};
// 登录
const confirm = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if(valid) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    }
  })
};
// 切换语言后重置表单
const afterSwitch = () => {
  loginFormRef.value.resetFields();
}
</script>

<template>
  <div class="login-page">
    <div class="login-box" v-loading="loading">
      <nav class="login-nav">
        <el-button size="small" @click="register">{{$t('login.register')}}</el-button>
        <Language @after-switch="afterSwitch"></Language>
      </nav>
      <header class="login-header">
        <img src="@/assets/images/base/logo.svg" alt="">
        <h1>angelina-bot</h1>
      </header>
      <main class="login-form">
        <el-form :rules="rules" :model="formData" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="formData.username" :placeholder="$t('login.username')" prefix-icon="User" size="large"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password" :placeholder="$t('login.password')" prefix-icon="Search" size="large" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="savepassword">
            <el-checkbox v-model="formData.savepassword" :label="$t('login.savePassword')"/>
          </el-form-item>
        </el-form>
      </main>
      <footer class="login-footer">
        <el-button icon='CircleClose' round size="large" @click="reset">{{ $t('login.reset') }}</el-button>
        <el-button icon='CircleCheck' round size="large" @click="confirm">{{ $t('login.confirm') }}</el-button>
      </footer>
    </div>
  </div>
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
    .login-form {
      margin: 30px 100px;
    }
    .login-footer {
      display: flex;
      justify-content: center;
      padding-bottom: 30px;
    }
  }
}
</style>