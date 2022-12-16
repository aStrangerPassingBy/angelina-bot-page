<script setup lang='ts'>
import download from './components/download.vue';
import document from './components/document.vue'
import about from './components/about.vue'
import github from './components/github.vue'
import user from './components/user.vue'
</script>

<template>
  <header class="header-box">
    <div class="header-left">
      <h1>
        title
      </h1>
      <h2>
        titletitiel
      </h2>
    </div>
    <ul class="header-right">
      <li class="header-right-item">
        <download></download>
      </li>
      <li class="header-right-item">
        <document></document>
      </li>
      <li class="header-right-item">
        <about></about>
      </li>
      <li class="header-right-item">
        <github></github>
      </li>
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
    display: flex;
    align-items: center;
  }
  .header-right {
    display: flex;
    .header-right-item {
      display: flex;
      align-items: center;
      margin: 0 20px;
    }
  }
  
}
</style>