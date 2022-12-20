<script setup lang='ts'>
import { reactive, onMounted } from 'vue';
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
  <div>
    <el-carousel
      trigger="click"
      arrow="hover"
      :interval="5000">
      <el-carousel-item v-for="item in noticeList" :key="item">
        <div class="el-carousel-item-content">
          <header>
            <h1>假装是标题</h1>
          </header>
          <main>
            <h2>{{ item.text }}</h2>
          </main>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
  
</template>

<style scoped lang='scss'>
.el-carousel-item-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px 100px;
}
.el-carousel__item:nth-child(n) {
  background-color: #F0F2F5;
}
</style>