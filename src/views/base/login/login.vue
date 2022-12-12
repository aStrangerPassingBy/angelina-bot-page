<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useGlobalStore from '@/stores';
import { useRouter } from 'vue-router';
import { setLocalStorage, getLocalStorage } from '@/utils/utils';
import type { FormInstance, FormRules } from 'element-plus'

type LoginForm = {
  username: string,
  password: string,
  savepassword: boolean
}

const i18n = useI18n();
const router = useRouter()
const global = useGlobalStore();

const loading = ref<boolean>(false);
const language = ref<boolean>(false);
const loginFormRef = ref();
const formData = reactive<LoginForm>({
  username: '',
  password: '',
  savepassword: false,
});

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

const register = () => {
  console.log('注册');
};
const reset = () => {
  loginFormRef.value.resetFields();
};
const confirm = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if(valid) {
      console.log(valid);
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        console.log('登陆成功');
      }, 1000);
    }
  })
};
const switchLanguage = () => {
  if(language.value) {
    global.updateLanguage('zh');
    i18n.locale.value = 'zh';
    setLocalStorage('language', 'zh')
  } else {
    global.updateLanguage('en');
    i18n.locale.value = 'en';
    setLocalStorage('language', 'en')
  }
  loginFormRef.value.resetFields();
};

onMounted(() => {
  const lang = getLocalStorage('language');
  console.log('lang', lang);
  
  if(lang === 'zh') {
    language.value = true;
    i18n.locale.value = 'zh';
  } else {
    language.value = false;
    i18n.locale.value = 'en';
  }
})
</script>

<template>
  <div class="login-page">
    <div class="login-box" v-loading="loading">
      <nav class="login-nav">
        <el-button size="small" @click="register">{{$t('login.register')}}</el-button>
        <div class="switch-language">
          <span>English</span>
          <el-switch v-model="language" @change="switchLanguage" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
          <span>中文</span>
        </div>
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
  width: 100%;
  height: 100%;
  min-height: 600px;
  min-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  .login-box {
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
      .switch-language {
        display: flex;
        align-items: center;
        justify-content: end;
        span {
          padding: 0 5px;
        }
      }
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