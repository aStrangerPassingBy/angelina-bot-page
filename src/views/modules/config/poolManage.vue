<script setup lang="ts">
import { ref } from 'vue';
import createPool from './poolManageComponents/createPool.vue';

const  createPoolVisible = ref(false);


</script>

<template>
  <div class="poolManage-box">
    <header class="box-header">
      <div class="btn-box">
        <el-button type="primary" @click="createPoolVisible = true">新增</el-button>
      </div>
    </header>
    <main></main>
    <el-dialog
      v-model="createPoolVisible"
      title="新增卡池"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="30%">
      <createPool></createPool>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createPoolVisible = false">Cancel</el-button>
          <el-button type="primary" @click="createPoolVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.poolManage-box {

}
</style>