<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FormRules } from 'element-plus';
import tempRoutes from '@/assets/json/common/tempRoutes.json'

const emits = defineEmits<{
  (e: 'afterLogin', returnObject: any): void,
  (e: 'updateLoading', status: boolean): void
}>()

type LoginForm = {
  username: string,
  password: string,
  savepassword: boolean
}

const i18n = useI18n();

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

const reset = () => {
  loginFormRef.value.resetFields();
};
// 登录
const confirm = () => {
  loginFormRef.value.validate((valid: boolean) => {
    if(valid) {
      emits('updateLoading', true)
      setTimeout(() => {
        const returnObject = {
          token: 'zzz',
          routes: tempRoutes
        }
        emits('afterLogin', returnObject);
      }, 1000);
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
      <el-form-item prop="username">
        <el-input v-model="formData.username" :placeholder="$t('login.usernamePlaceholder')" prefix-icon="User" size="large"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" :placeholder="$t('login.passwordPlaceholder')" prefix-icon="Search" size="large" type="password"></el-input>
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