<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { getNoticeApi } from '@/api/modules/home/index';
import noticeDetail from './noticeDetail.vue';
import type { NoticeItem } from '../interface';
import { getNoticeImgApi } from '@/api/modules/config/notice';

const loading = ref(false);
const detailVisible = ref(false);
const showDetailBtn = ref(false);
const selectNotice = reactive<NoticeItem>({
  id: '',
  text: '',
  img: null
})
const noticeList = reactive<NoticeItem[]>([
  { id: '', text: '暂无公告', img: undefined }
]);

const showDetail = (item: NoticeItem) => {
  selectNotice.id = item.id;
  selectNotice.text = item.text;
  selectNotice.img = item.img;
  detailVisible.value = true;
}

// 获取所选索引对应的的图片
const noticeChange = (current: number) => {
  // 如果当前索引没有图片再获取
  if(!noticeList[current].img) {
      const params = {
      id: noticeList[current].id
    }
    const config = {
      responseType: 'blob'
    }
    getNoticeImgApi(params, config).then(res => {
      console.log('获取公告图片', res);
      noticeList[current].img = window.URL.createObjectURL(res);
    }).catch(err => {
      console.log('err',err);
      
    });
  }
}

const init = () => {
  loading.value = true;
  getNoticeApi().then(res => {
    if(res.data.length > 0) {
      noticeList.length = 0;
      res.data.forEach((item: NoticeItem) => {
        item.img = undefined;
        return noticeList.push(item);
      })
      showDetailBtn.value = true;
      noticeChange(0);
    }
  }).catch(err => {
    console.log('err', err);
  }).finally(() => {
    loading.value = false;
  })
}

onMounted(() => {
  init();
})
</script>

<template>
  <el-carousel
    v-loading="loading"
    trigger="click"
    arrow="hover"
    @change="noticeChange"
    :interval="500000">
    <el-carousel-item v-for="item in noticeList" :key="item">
      <div class="el-carousel-item-content">
        <header class="notice-header">
          <img v-show="item.img" class="notice-img" :src="item.img!">
          <div v-show="!item.img" class="no-img">
            暂无图片
          </div>
          <h2>标题，虽说并没有什么标题</h2>
          <el-button v-if="showDetailBtn" class="notice-detail-button" size="small" @click="showDetail(item)">详情</el-button>
        </header>
        <main class="notice-main">
          <h2 :title="item.text">{{ item.text }}</h2>
        </main>
      </div>
    </el-carousel-item>
    <el-dialog
      v-model="detailVisible"
      title="公告详情"
      width="30%"
      :destroy-on-close="true">
      <noticeDetail :selectNotice="selectNotice"></noticeDetail>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="detailVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
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
  width: 100%;
  .notice-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 0 auto;
    height: 80%;
    width: 100%;
    .notice-img {
      margin: 0 auto;
      height: 80%;
      object-fit: 'fill';
      text-align: center;
    }
    .no-img {
      margin: 0 auto;
      height: 80%;
      line-height: 80%;
      color: #e9e9eb;
      text-align: center;
    }
    h2 {
      text-align: center;
    }
    .notice-detail-button {
      position: absolute;
      right: 10px;
      top: 10px;
      display: none;
    }
  }
  .notice-header:hover {
    .notice-detail-button {
      display: block;
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
      // height: 100%;
      white-space: nowrap;
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