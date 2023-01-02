<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getBotListApi } from '@/api/modules/console';
import botListItem from './components/botListItem.vue';
import fnSituation from './components/fnSituation.vue';
import tokenSituation from './components/tokenSituation.vue';
import type { BotListItem } from './interface';

const leftLoading = ref(false);
const botList = reactive<BotListItem[]>([]);

onMounted(() => {
  leftLoading.value = true;
  getBotListApi().then(res => {
    console.log('getBotListApi', res.data.length);
    if(res.data[0] !== null) {
      res.data.forEach((item: BotListItem) => {
        botList.push(item);
      });
    }
    leftLoading.value = false;
  })
})
</script>

<template>
  <div class="console-box">
    <div class="console-box-left" v-loading="leftLoading">
      <div class="bot-list-box" v-show="botList.length">
        <botListItem v-for="item in botList" :key="item.id" :botInfo="item"></botListItem>
      </div>
      <div class="no-bot" v-show="!botList.length">
        <el-empty description="暂无绑定的机器人" />
      </div>
    </div>
    <div class="console-box-right">
      <tokenSituation></tokenSituation>
      <fnSituation></fnSituation>
    </div>
  </div>
</template>

<style scoped lang="scss">
.console-box {
  display: flex;
  width: 100%;
  max-width: 1920px;
  .console-box-left, .console-box-right {
    width: 50%;
  }
  .console-box-left {
    margin-right: 30px;
    .bot-list-box {
      flex-direction: column;
    }
    .no-bot {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50%;
    }
  }
  .console-box-right {
    margin-left: 30px;
  }
}
</style>