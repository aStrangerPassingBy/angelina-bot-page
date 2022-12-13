<script setup lang='ts'>

</script>

<template>
  <el-popover
    placement="bottom"
    :width="150"
    trigger="hover">
    <template #reference>
      <el-avatar :size="35" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
    </template>
    <ul class="user-menu">
      <li class="user-menu-item">个人中心</li>
      <li class="user-menu-item">退出登录</li>
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