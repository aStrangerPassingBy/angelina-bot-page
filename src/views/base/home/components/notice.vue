<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { getNoticeApi } from '@/api/modules/home/index';

type NoticeItem = {
  id: string,
  text: string,
  img: string
}

const noticeList = reactive<NoticeItem[]>([]);

onMounted(() => {
  getNoticeApi().then(res => {
    res.data.forEach((item: NoticeItem) => {
      return noticeList.push(item)
    })
  })
})
</script>

<template>
  <el-carousel
    trigger="click"
    arrow="hover"
    :interval="1000000">
    <el-carousel-item v-for="item in noticeList" :key="item">
      <div class="el-carousel-item-content">
        <header class="notice-header">
          <img src="@/assets/images/base/logo.svg" alt="">
          <h2>标题，虽说并没有什么标题</h2>
        </header>
        <main class="notice-main">
          <h2 :title="item.text">{{ item.text }}</h2>
        </main>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped lang='scss'>
.el-carousel-item-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .notice-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 auto;
    height: 80%;
    width: 100%;
    img {
      margin: 0 auto;
      width: 80%;
      height: 80%;
    }
    h2 {
      text-align: center;
    }
  }
  .notice-main {
    box-sizing: border-box;
    height: 20%;
    width: 100%;
    padding: 10px;
    background: #e9e9eb;
    border: 2px solid #fff;
    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      padding: 0 5px;
      text-align: center;
    }
  }
}
.el-carousel__item:nth-child(n) {
  background-color: #F0F2F5;
}
</style>