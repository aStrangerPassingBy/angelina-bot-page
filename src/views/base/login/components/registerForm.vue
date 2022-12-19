<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
import adminRoutes from '@/assets/json/common/tempAdminRoutes.json'
import commonRoutes from '@/assets/json/common/tempCommonRoutes.json'
import { registerApi, getRSAPublicKeyApi } from '@/api/common';
import { getRsaPassword } from '@/utils/rsaEncrypt'
import type { RouteListItem } from '@/router/interface';

type LoginForm = {
  username: string,
  password: string,
  confirmPassword: string
}
type EmitObject = {
  token: string,
  routeList: RouteListItem[]
}

const emits = defineEmits<{
  (e: 'afterRegister', EmitObject: EmitObject): void,
  (e: 'cancelRegister'): void,
}>()

const i18n = useI18n();

const registerFormRef = ref();
const loading = ref<boolean>(false);
const formData = reactive<LoginForm>({
  username: '',
  password: '',
  confirmPassword: '',
})

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
    ],
    confirmPassword: [
      {
        validator: confirmPasswordEnter,
        trigger: 'change'
      }
    ]
  }
})

const confirmPasswordEnter = (rule: any, value: any, callback: any) => {
  if(value === '') {
    callback(new Error('请输入密码'))
  } else if(value !== formData.password) {
    callback(new Error('输入的密码不一致！'))
  } else {
    callback()
  }
}

const confirm = () => {
  registerFormRef.value.validate(async (valid: boolean) => {
    if(valid) {
      let params, returnRegister, publicKey, emitObject: EmitObject;
      loading.value = true;
      try {
        const returnPublicKey = await getRSAPublicKeyApi();
        publicKey = returnPublicKey.data;
        params = {
          name: formData.username,
          pwd: getRsaPassword(publicKey, formData.password),
        };
        returnRegister = await registerApi(params);
        ElMessage({
          type: 'success',
          message: '注册成功'
        })
      } catch(err) {
        ElMessage({
          type: 'error',
          message: '注册失败'
        })
        console.log('err', err);
      }
      if(returnRegister.data.userInfo.isAdmin) {
        emitObject = {
          token: returnRegister.data.token,
          routeList: adminRoutes as unknown as RouteListItem[]
        };
      } else {
        emitObject = {
          token: returnRegister.data.token,
          routeList: commonRoutes as unknown as RouteListItem[]
        };
      }
      loading.value = false;
      emits('afterRegister', emitObject);
    }
  });
}
const cancel = () => {
  emits('cancelRegister');
}
</script>

<template>
  <div class="register-box" v-loading="loading">
    <el-form :hide-required-asterisk="true" :rules="rules" :model="formData" ref="registerFormRef">
      <el-form-item :label="$t('login.username')" prop="username">
        <el-input v-model="formData.username" :placeholder="$t('login.usernamePlaceholder')" prefix-icon="User" size="large"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.password')" prop="password">
        <el-input v-model="formData.password" :placeholder="$t('login.passwordPlaceholder')" prefix-icon="Search" size="large" type="password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.password')" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword" :placeholder="$t('login.passwordPlaceholder')" prefix-icon="Search" size="large" type="password"></el-input>
      </el-form-item>
    </el-form>
    <footer class="btn-box">
      <el-button @click="cancel">{{ $t('login.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">
        {{ $t('login.confirm') }}
      </el-button>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.register-box {
  display: flex;
  flex-direction: column;
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>