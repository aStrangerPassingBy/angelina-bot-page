<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessageBox, type FormRules } from 'element-plus'
import tempAdminRoutes from '@/assets/json/common/tempAdminRoutes.json'
import { creatCaptchaApi, captchaApi } from '@/api/common';

const emits = defineEmits<{
  // 登录成功后会掉
  (e: 'afterLogin', returnObject: any): void,
  // 更新父组件loading状态
  (e: 'updateLoading', status: boolean): void
}>()

type LoginForm = {
  qq: string,
}
const i18n = useI18n();

const loginFormRef = ref();
const formData = reactive<LoginForm>({
  qq: '',
});

const rules = computed(():FormRules => {
  return {
    qq: [
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
      emits('updateLoading', true);
      const params = {
        qq: formData.qq
      }
      creatCaptchaApi(params).then(res => {
        ElMessageBox.confirm(`给qq发送${res.data}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          captchaApi({qq: formData.qq}).then(res => {
            console.log('验证是否通过', res);
          }).catch((err) => {
            console.log(err);
          })
        })
      }).catch(err => {
        console.log('err', err);
        
      })
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
        <el-input v-model="formData.qq" :placeholder="$t('login.botQQPlaceholder')" prefix-icon="User" size="large"></el-input>
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