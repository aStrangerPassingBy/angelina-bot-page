<script setup lang='ts'>
import user from './components/user.vue'
</script>

<template>
  <header class="header-box">
    <div class="header-left">
      <h1>
        title
      </h1>
    </div>
    <ul class="header-right">
      <li class="header-right-item">
        <Language></Language>
      </li>
      <li class="header-right-item">
        <user></user>
      </li>
    </ul>
  </header>
</template>

<style scoped lang='scss'>
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  background: #79bbff;
  padding: 0 20px;
  .header-left {
    
  }
  .header-right {
    display: flex;
    .header-right-item {
      display: flex;
      align-items: center;
      margin: 0 10px;
    }
  }
  
}
</style>