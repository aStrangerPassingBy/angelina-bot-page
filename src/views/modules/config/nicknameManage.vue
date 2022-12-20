<script setup lang='ts'>
import { reactive, onMounted } from 'vue'
import { getAllNickNameApi } from '@/api/modules/config/nickname';

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
const handleClick = () => {
  
}
const query = () => {
  // const params = {
  //   current: state.pagination.currentPage
  // }
  getAllNickNameApi().then(res => {
    console.log('nickname', res);
    state.tableData = res.data;
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
      <!-- <div class="btn-box">
        <el-button type="primary" @click="createPoolVisible = true">新增</el-button>
      </div> -->
    </header>
    <main class="box-main">
      <el-table :data="state.tableData" style="width: 100%;">
        <el-table-column fixed prop="name" align="center" label="name" width="150"/>
        <el-table-column prop="nickName" align="center" label="nickName"/>
        <el-table-column prop="version" align="center" label="version"/>
        <!-- <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </main>
  </div>
</template>

<style scoped lang='scss'>

</style>