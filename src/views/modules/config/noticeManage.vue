<script setup lang='ts'>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { createNoticeApi, deleteNoticeApi, editNoticeApi, getNoticeApi, createNoticeImgApi } from '@/api/modules/config'
import createNoticeForm from './noticeManageComponents/createNoticeForm.vue'

type NoticeItem = {
  id: string,
  text: string,
  img: string
}
type DetailNoticeItem = {
  type: string,
  data: NoticeItem
}

const loading = ref<boolean>(false);
const createVisible = ref(false);
const edit_detailVisible = ref(false);
const noticeList = reactive<NoticeItem[]>([]);
const detailNoticeItem = reactive<DetailNoticeItem>({
  type: 'detail',
  data: {
    id: '',
    text: '',
    img: '',
  }
});

// 新增公告
const createNotice = () => {
  createVisible.value = true;
}
const afterCreate = () => {
  cancelCreate();
  init();
}
const cancelCreate = () => {
  createVisible.value = false;
}

// 查看详情
const detailNotice = (noticeItem: NoticeItem) => {
  detailNoticeItem.type = 'detail';
  detailNoticeItem.data = noticeItem;
  edit_detailVisible.value = true;
}
// 修改公告
const editNotice = (noticeItem: NoticeItem) => {
  detailNoticeItem.type = 'edit';
  detailNoticeItem.data = noticeItem;
  edit_detailVisible.value = true;
}
// 删除公告
const deleteNotice = (id: string) => {
  ElMessageBox.confirm('确定要退删除该公告么', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    console.log('删除了');
  }).catch(() => {

  })
}

// 初始化
const init = () => {
  loading.value = true;
  getNoticeApi().then(res => {
    res.data.forEach((item: NoticeItem) => {
      noticeList.push(item);
    });
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
  <div class="noticeManage-box" v-loading="loading">
    <header class="noticeManage-box-header">
      <el-button type="primary" @click="createNotice">新增</el-button>
    </header>
    <ul class="noticeList-box">
      <li class="notice-item" v-for="item in noticeList" :key="item.id">
        <header class="notice-header">
          <h4>标题：说是标题，但其实并没有标题</h4>
        </header>
        <main class="notice-main">
          {{ item.text }}
        </main>
        <footer class="notice-footer">
          <div class="btn-box">
            <el-button icon='View' type="primary" link @click="detailNotice(item)">详情</el-button>
            <el-divider direction="vertical" border-style="dashed" />
            <el-button icon='EditPen' type="primary" link @click="editNotice(item)">修改</el-button>
            <el-divider direction="vertical" border-style="dashed" />
            <el-button icon='Delete' type="primary" link @click="deleteNotice(item.id!)">删除</el-button>
          </div>
        </footer>
      </li>
    </ul>
    <el-dialog
      v-model="createVisible"
      title="新增"
      :close-on-click-modal="false"
      :append-to-body="true"
      :destroy-on-close="true"
      width="400px">
      <createNoticeForm @afterCreate="afterCreate"></createNoticeForm>
    </el-dialog>
    <el-dialog
      v-model="edit_detailVisible"
      :title="$t(`config.${detailNoticeItem.type}`)"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="30%">
      <!-- <noticeDetail :detailNoticeItem="detailNoticeItem"></noticeDetail> -->
    </el-dialog>
  </div>
</template>

<style scoped lang='scss'>
.noticeManage-box {
  height: 100%;
  .noticeManage-box-header {
    
  }
  .noticeList-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: left;
    .notice-item {
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 200px;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin: 10px 5px;
      .notice-header {
        display: flex;
        align-items: center;
        flex: 2;
        padding: 5px;
        border-bottom: 1px solid #ccc;
      }
      .notice-main {
        flex: 6;
        padding: 5px;
      }
      .notice-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 2;
        padding: 5px;
        border-top: 1px solid #ccc;
        .btn-box {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>