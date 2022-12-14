<script setup lang='ts'>
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter();
const globalStore = useGlobalStore();

const handleLogout = () => {
  ElMessageBox.confirm(
    '确定要退出登录么',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  ).then(() => {
    globalStore.clearToken();
    router.push({
      path: '/login'
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Delete canceled',
    })
  })
}
</script>

<template>
  <el-popover
    placement="bottom"
    :width="150"
    trigger="hover">
    <template #reference>
      <el-avatar :size="35" src="../../../assets/images/base/default-avatar.png"/>
    </template>
    <ul class="user-menu">
      <li class="user-menu-item">个人中心</li>
      <li class="user-menu-item" @click="handleLogout">退出登录</li>
    </ul>
  </el-popover>
  
</template>

<style scoped lang='scss'>
  .user-menu {
    .user-menu-item {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      user-select: none;
    }
    .user-menu-item:hover {
      background: #c6e2ff;
    }
  }
</style>