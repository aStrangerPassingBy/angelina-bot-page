<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { getAllBotDataApi, getVisitPageDataByTimeApi } from '@/api/modules/home';

const serverInfo = reactive({
  ram: 0,
  receive: 0,
  send: 0
})
const visitInfo = reactive({
  visit: 0
})
onMounted(() => {
  Promise.all([getAllBotDataApi(), getVisitPageDataByTimeApi()])
    .then(result => {
      serverInfo.ram = result[0].data.ram;
      serverInfo.receive = result[0].data.receive;
      serverInfo.send = result[0].data.send;
      let count: number = 0;
      result[1].data.forEach((item: any) => {
        count += item.count;
      })
      visitInfo.visit = count;
    })
})
</script>

<template>
  <el-descriptions title="server Info" :column="2">
    <el-descriptions-item label="内存">
      <el-tag>{{ serverInfo.ram }}</el-tag>
      <span>MB</span>
    </el-descriptions-item>
    <el-descriptions-item label="接收消息">
      <el-tag>{{ serverInfo.receive }}</el-tag>
      <span>条</span>
    </el-descriptions-item>
    <el-descriptions-item label="发送消息">
      <el-tag>{{ serverInfo.send }}</el-tag>
      <span>条</span>
    </el-descriptions-item>
    <el-descriptions-item label="24小时内访问量">
      <el-tag>{{ visitInfo.visit }}</el-tag>
      <span></span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped>
  
</style>