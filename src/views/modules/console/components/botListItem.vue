<script setup lang="ts">
import type { BotListItem } from '../interface';

type Props = {
  botInfo: BotListItem
}

const props = defineProps<Props>()

</script>

<template>
  <div class="bot-item-box">
    <h1>{{ props.botInfo.name }}</h1>
    <el-table :data="props.botInfo.list" style="width: 100%" :header-cell-style="{background: '#ecf5ff'}">
      <el-table-column prop="qq" label="账号" />
      <el-table-column prop="frame" label="框架" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="isOnline" label="在线">
        <template v-slot="scope">
          <el-tag v-if="scope.row.isOnline" type="success">online</el-tag>
          <el-tag v-else type="danger">offline</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.bot-item-box {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  h1 {
    margin: 5px;
  }
}
</style>