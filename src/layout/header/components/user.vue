<script setup lang='ts'>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import { ElMessageBox } from 'element-plus'
import { clearSessionStorage } from '@/utils/storage';

const router = useRouter();
const globalStore = useGlobalStore();

const visible = reactive({
  bindQQ: false
})

const editUN = () => {

}
const editPW = () => {

}
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录么', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    globalStore.clearToken();
    clearSessionStorage();
    router.push({
      path: '/login'
    })
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
    <ul class="user-menu">
      <li class="user-menu-item" @click="visible.bindQQ = true">
        <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
        {{ $t('header.bindQQ') }}
      </li>
      <el-dialog
        v-model="visible.bindQQ"
        :title="$t('header.bindQQ')"
        :close-on-click-modal="false"
        :append-to-body="true"
        width="30%">
        <span>bind</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="visible.bindQQ = false">{{ $t('common.cancel') }}</el-button>
            <el-button type="primary" @click="visible.bindQQ = false">
              {{ $t('common.confirm') }}
            </el-button>
          </span>
        </template>
      </el-dialog>
      <li class="user-menu-item" @click="editUN">
        <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
        {{ $t('header.editUN') }}
      </li>
      <li class="user-menu-item" @click="editUN">
        <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
        {{ $t('header.editUN') }}
      </li>
      <li class="user-menu-item" @click="editPW">
        <!-- <img src="@/assets/images/base/edit.svg" alt=""> -->
        {{ $t('header.editPW') }}
      </li>
      <li class="user-menu-item" @click="handleLogout">
        <!-- <img src="@/assets/images/base/user-logout.svg" alt=""> -->
        {{ $t('header.logout') }}
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