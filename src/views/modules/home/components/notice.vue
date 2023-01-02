<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue';
import { getNoticeApi } from '@/api/modules/home/index';
import noticeDetail from './noticeDetail.vue';
import type { NoticeItem } from '../interface';

const detailVisible = ref(false);
const selectNotice = reactive<NoticeItem>({
  id: '',
  text: '',
  img: null
})
const noticeList = reactive<NoticeItem[]>([]);

const showDetail = (item: NoticeItem) => {
  selectNotice.id = item.id;
  selectNotice.text = item.text;
  selectNotice.img = item.img;
  detailVisible.value = true;
}

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
    class="notice-box"
    trigger="click"
    arrow="hover"
    :interval="5000000">
    <el-carousel-item v-for="item in noticeList" :key="item">
      <div class="el-carousel-item-content">
        <header class="notice-header">
          <!-- <img class="notice-img" src="@/assets/images/base/logo.svg" alt=""> -->
          <div class="notice-img">
            假装是一张图片，实际上点开详情才有可能有图片
          </div>
          <h2>标题，虽说并没有什么标题</h2>
          <el-button class="notice-detail-button" size="small" @click="showDetail(item)">详情</el-button>
        </header>
        <main class="notice-main">
          <h2 :title="item.text">{{ item.text }}</h2>
        </main>
      </div>
    </el-carousel-item>
  </el-carousel>
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
</template>

<style scoped lang='scss'>
.notice-box {
  box-sizing: border-box;
  height: 300px;
  width: 80%;
  background: #ccc;
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
      position: relative;
      padding: 0 auto;
      height: 80%;
      width: 100%;
      .notice-img {
        margin: 0 auto;
        width: 80%;
        height: 80%;
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
}

.el-carousel__item:nth-child(n) {
  background-color: #F0F2F5;
}
</style>