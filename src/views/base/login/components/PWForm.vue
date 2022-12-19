<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FormRules } from 'element-plus';
import adminRoutes from '@/assets/json/common/tempAdminRoutes.json'
import commonRoutes from '@/assets/json/common/tempCommonRoutes.json'
import { getRSAPublicKeyApi, loginApi } from '@/api/common';
import { getRsaPassword } from '@/utils/rsaEncrypt';
import type { RouteListItem } from '@/router/interface';

type EmitObject = {
  token: string,
  routeList: RouteListItem[]
}

const emits = defineEmits<{
  (e: 'afterLogin', emitObject: EmitObject): void,
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

const rules = computed((): FormRules => {
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

// 重置表单
const reset = () => {
  loginFormRef.value.resetFields();
};
// 密码登录，如果本地没有publicKey则先获取publicKey再登录
const confirm = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if(valid) {
      let params, returnLogin, publicKey, emitObject: EmitObject;
      emits('updateLoading', true);
      try {
        const returnPublicKey = await getRSAPublicKeyApi();
        publicKey = returnPublicKey.data;
        params = {
          name: formData.username,
          pwd: getRsaPassword(publicKey, formData.password),
        };
        returnLogin = await loginApi(params);
          if(returnLogin.data?.userInfo.isAdmin) {
          emitObject = {
            token: returnLogin.data.token,
            routeList: adminRoutes as unknown as RouteListItem[]
          };
        } else {
          emitObject = {
            token: returnLogin.data.token,
            routeList: commonRoutes as unknown as RouteListItem[]
          };
        }
        emits('afterLogin', emitObject);
      } catch(err) {
        console.log('err', err);
      }
      emits('updateLoading', false);
    }
  });
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
        <el-input v-model="formData.password" :placeholder="$t('login.passwordPlaceholder')" prefix-icon="Lock" size="large" type="password"></el-input>
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