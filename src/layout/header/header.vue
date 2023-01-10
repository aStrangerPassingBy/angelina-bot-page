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
      <img src="@/assets/images/base/angelina.jpg" alt="">
      <h1>
        angelina-bot
      </h1>
      &nbsp;
      <h2>
        --明日方舟主题群聊机器人
      </h2>
    </div>
    <div class="header-right">
      <div class="hide-list">
        <about></about>
        <download></download>
        <document></document>
        <github></github>
        <Language></Language>
      </div>
      <div class="show-list">
        <el-popover
          placement="bottom"
          :width="100"
          trigger="hover">
          <template #reference>
            <Grid style="width: 30px; height: 30px;"/>
          </template>
          <div>
            <about></about>
            <download></download>
            <document></document>
            <github type="text"></github>
            <Language type="text"></Language>
          </div>
        </el-popover>
      </div>
      <div class="always-list">
        <user></user>
      </div>
    </div>
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
      border-radius: 50%;
      margin-right: 10px;
    }
    h1 {
      font-size: 35px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .hide-list, .show-list, .always-list {
      display: flex;
      align-items: center;
      :nth-child(n) {
        display: flex;
        align-items: center;
        margin: 0 15px;
      }
    }
    .show-list {
      display: none;
    }
  }
}
@media screen and (max-width: 1080px) {
  .header-left {
    h2 {
      display: none;
    }
  }
}
@media screen and (max-width: 790px) {
  .hide-list {
    display: none !important;
  }
  .show-list {
    display: flex !important;
  }
  .show-list, .always-list {
    :nth-child(n) {
      margin: 0 10px !important;
    }
  }
}
@media screen and (max-width: 505px) {
  .header-left {
    h1 {
      font-size: 25px !important;
    }
  }
  .always-list {
    :nth-child(n) {
      margin-right: 0 !important;
    }
  }
}
</style>