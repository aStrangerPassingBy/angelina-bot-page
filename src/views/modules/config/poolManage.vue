<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getAllPoolDataApi } from '@/api/modules/config/pool';
import createPool from './poolManageComponents/createPool.vue';

const createPoolVisible = ref(false);
const state = reactive({
  loading: false,
  tableData: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 0
  }
})
const handleCurrentChange = (val: number) => {
  state.pagination.currentPage = val;
  query()
}
const handleDelete = () => {
  
}
const query = () => {
  state.loading = true;
  const params = {
    current: state.pagination.currentPage
  }
  getAllPoolDataApi(params).then(res => {
    state.tableData = res.data;
    state.pagination.totalCount = res.count;
  }).catch((err) => {
    console.log('err', err);
  }).finally(() => {
    state.loading = false;
  })
}

const init = () => {
  query();
}

onMounted(() => {
  init();
})
</script>

<template>
  <div v-loading="state.loading" class="poolManage-box">
    <header class="box-header">
      <div class="btn-box">
        <el-button type="primary" @click="createPoolVisible = true">新增</el-button>
      </div>
    </header>
    <main class="box-main">
      <el-table :data="state.tableData" style="width: 100%;">
        <el-table-column fixed prop="name" align="center" label="name" width="150"/>
        <el-table-column prop="star" align="center" label="star"/>
        <el-table-column prop="pool" align="center" label="pool"/>
        <el-table-column prop="version" align="center" label="version"/>
        <!-- <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleDelete">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </main>
    <footer class="box-footer">
      <el-pagination
        v-model:current-page="state.pagination.currentPage"
        v-model:page-size="state.pagination.pageSize"
        background
        layout="prev, pager, next, jumper"
        :total="state.pagination.totalCount"
        @current-change="handleCurrentChange"/>
    </footer>
    <el-dialog
      v-model="createPoolVisible"
      title="新增卡池"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="30%">
      <createPool></createPool>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createPoolVisible = false">Cancel</el-button>
          <el-button type="primary" @click="createPoolVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.poolManage-box {
  .box-footer {
    display: flex;
    margin: 10px;
    justify-content: right;
  }
}
</style>