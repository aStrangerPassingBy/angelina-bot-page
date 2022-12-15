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
      <!-- <el-avatar :size="35" src-set="@/assets/images/base/default-avatar.png"/> -->
      <img class="user-avatar" src="@/assets/images/base/default-avatar.png" alt="">
    </template>
    <ul class="user-menu">
      <li class="user-menu-item" @click="handleLogout">
        <img src="@/assets/images/base/user-logout.svg" alt="">
        {{ $t('user.logout') }}
      </li>
    </ul>
  </el-popover>
  
</template>

<style scoped lang='scss'>
.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}
.user-menu {
  .user-menu-item {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    user-select: none;
    img {
      width: 25px;
      height: 25px;
      margin: 0 5px;
    }
  }
  .user-menu-item:hover {
    background: #c6e2ff;
  }
}
</style>