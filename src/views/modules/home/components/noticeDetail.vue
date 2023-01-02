<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getNoticeImgApi } from '@/api/modules/config/notice';
import type { NoticeItem } from '../interface';
type Props = {
  selectNotice: NoticeItem
}
const props = defineProps<Props>();
const imgData = ref();

onMounted(() => {
  const params = {
    id: props.selectNotice.id
  }
  const config = {
    responseType: 'blob'
  }
  getNoticeImgApi(params, config).then(res => {
    console.log('获取公告图片', res);
    imgData.value = window.URL.createObjectURL(res);
  })
})
</script>

<template>
  <div class="notice-detail-box">
    <header class="header">
      <h2>标题</h2>
    </header>
    <main class="main">
      <img class="notice-img" :src="imgData" alt="">
      {{ props.selectNotice.text }}
    </main>
  </div>
</template>

<style lang="scss" scoped>
.notice-detail-box {
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .notice-img {
      width: 80%;
      object-fit: 'fill';
      margin: 10px 0;
    }
  }
  
}
</style>