<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalStore from '@/stores';
import { ElMessageBox } from 'element-plus'
import { clearSessionStorage } from '@/utils/storage';
import linkToBot from './userComponents/linkToBot.vue'
import editUsername from './userComponents/editUserame.vue'
import editPassword from './userComponents/editPassword.vue'

const router = useRouter();
const globalStore = useGlobalStore();

const visible = reactive({
  linkToBot: false,
  editUsername: false,
  editPassword: false,
})

const qq = ref('');
const name = ref('');
const pwd = reactive({
  oldPwd: '',
  newPwd: '',
});

const handleLinkToBot = () => {

}

const handleEditUsername = () => {
  console.log('name', name);
  
}

const handleEditPassword = () => {

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
    <!-- 绑定bot -->
    <el-dialog
      v-model="visible.linkToBot"
      :title="$t('header.linkToBot')"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="30%">
      <linkToBot></linkToBot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible.linkToBot = false">{{ $t('header.cancel') }}</el-button>
          <el-button type="primary" @click="handleLinkToBot">
            {{ $t('header.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改账户名 -->
    <el-dialog
      v-model="visible.editUsername"
      :title="$t('header.editUsername')"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="30%">
      <editUsername></editUsername>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible.editUsername = false">{{ $t('header.cancel') }}</el-button>
          <el-button type="primary" @click="handleEditUsername">
            {{ $t('header.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      v-model="visible.editPassword"
      :title="$t('header.editPassword')"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="30%">
      <editPassword></editPassword>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible.editPassword = false">{{ $t('header.cancel') }}</el-button>
          <el-button type="primary" @click="handleEditPassword">
            {{ $t('header.confirm') }}
          </el-button>
        </span>
      </template>
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