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
      <img src="@/assets/images/base/logo.svg" alt="">
      <h1>
        title
      </h1>
      <h2>
        -{{ $t('header.description') }}
      </h2>
    </div>
    <ul class="header-right">
      <li class="header-right-item">
        <about></about>
      </li>
      <li class="header-right-item">
        <download></download>
      </li>
      <li class="header-right-item">
        <document></document>
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
    img {
      width: 40px;
      height: 40px;
      // border-radius: 50%;
      margin-right: 10px;
    }
    h1 {
      font-size: 30px;
    }
  }
  .header-right {
    display: flex;
    .header-right-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 20px;
      // width: 75px;
    }
  }
  
}
</style>