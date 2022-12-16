<script setup lang='ts'>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

type LoginForm = {
  username: string,
  password: string,
}

const i18n = useI18n();

const formData = reactive<LoginForm>({
  username: '',
  password: '',
})
</script>

<template>
  <div>
    <el-form :model="formData" ref="loginFormRef">
      <el-form-item :label="$t('login.username')" prop="username">
        <el-input v-model="formData.username" :placeholder="$t('login.usernamePlaceholder')" prefix-icon="User" size="large"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.password')" prop="password">
        <el-input v-model="formData.password" :placeholder="$t('login.passwordPlaceholder')" prefix-icon="Search" size="large" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang='scss'>

</style>