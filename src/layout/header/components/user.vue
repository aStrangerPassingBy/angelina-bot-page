<script setup lang='ts'>
import { reactive, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores';
import { useRoutes } from '@/hooks/useRoutes';
import { ElMessageBox } from 'element-plus';
import linkToBot from './userComponents/linkToBot.vue'
import editUsername from './userComponents/editUserame.vue'
import editPassword from './userComponents/editPassword.vue'

const router = useRouter();
const i18n = useI18n();
const routes = useRoutes();
const globalStore = useGlobalStore();

const visible = reactive({
  linkToBot: false,
  editUsername: false,
  editPassword: false,
})
const $bus: any = inject('$bus')

const closeDialog = () => {
  visible.linkToBot = false;
  visible.editUsername = false;
  visible.editPassword = false;
  $bus.emit('initBotList');
}

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm(`${i18n.t('header.confirmLogout')}`, {
    confirmButtonText: `${i18n.t('header.confirm')}`,
    cancelButtonText: `${i18n.t('header.cancel')}`,
  }).then(() => {
    globalStore.initGlobalStore();
    routes.removeRoutes();
    setTimeout(() => {
      router.push({
        path: '/home'
      })
    }, 100);
  }).catch(() => {})
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
    <template v-if="globalStore.isLogin">
      <div class="userInfo-box">
        <img class="user-avatar" src="@/assets/images/base/default-avatar.png" alt="">
        <div>{{ globalStore.userInfo.name }}</div>
      </div>
      <ul class="user-menu">
        <li class="user-menu-item" @click="visible.linkToBot = true">
          <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
          {{ $t('header.linkToBot') }}
        </li>
        
        <li class="user-menu-item" @click="visible.editUsername = true">
          <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
          {{ $t('header.editUsername') }}
        </li>
        <li class="user-menu-item" @click="visible.editPassword = true">
          <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
          {{ $t('header.editPassword') }}
        </li>
        <li class="user-menu-item" @click="handleLogout">
          <!-- <img src="@/assets/images/base/user-logout.svg" alt=""> -->
          {{ $t('header.logout') }}
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="tourist-box">
        <span>未登录</span>
        <el-button size="small" @click="router.replace({path: '/login'})">登录</el-button>
      </div>
    </template>
    <!-- 绑定bot -->
    <el-dialog
      v-model="visible.linkToBot"
      :title="$t('header.linkToBot')"
      :close-on-click-modal="false"
      :append-to-body="true"
      destroy-on-close
      draggable
      width="400px">
      <linkToBot @closeDialog="closeDialog"></linkToBot>
    </el-dialog>
    <!-- 修改账户名 -->
    <el-dialog
      v-model="visible.editUsername"
      :title="$t('header.editUsername')"
      :close-on-click-modal="false"
      :append-to-body="true"
      destroy-on-close
      draggable
      width="400px">
      <editUsername @closeDialog="closeDialog"></editUsername>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      v-model="visible.editPassword"
      :title="$t('header.editPassword')"
      :close-on-click-modal="false"
      :append-to-body="true"
      destroy-on-close
      draggable
      width="400px">
      <editPassword @closeDialog="closeDialog"></editPassword>
    </el-dialog>
  </el-popover>
</template>

<style scoped lang='scss'>
.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}
.userInfo-box {
  padding: 10px 0 ;
  text-align: center;
  border-bottom: 1px solid #ccc;
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
.tourist-box {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>