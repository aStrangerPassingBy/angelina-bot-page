<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FormRules } from 'element-plus'
import tempRoutes from '@/assets/json/common/tempRoutes.json'

const emits = defineEmits<{
  // 登录成功后会掉
  (e: 'afterLogin', returnObject: any): void,
  // 更新父组件loading状态
  (e: 'updateLoading', status: boolean): void
}>()

type LoginForm = {
  username: string,
}
const i18n = useI18n();

const loginFormRef = ref();
const formData = reactive<LoginForm>({
  username: '',
});

const rules = computed(():FormRules => {
  return {
    username: [
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
  loginFormRef.value.validate((valid: boolean) => {
    if(valid) {
      emits('updateLoading', true)
      setTimeout(() => {
        const returnObject = {
          token: '',
          routes: tempRoutes
        }
        emits('afterLogin', returnObject)
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
        <el-input v-model="formData.username" :placeholder="$t('login.botQQPlaceholder')" prefix-icon="User" size="large"></el-input>
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