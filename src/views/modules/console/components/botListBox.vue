<script setup lang="ts">
import { ref, reactive, inject, onMounted, onUnmounted } from 'vue';
import botListItem from './botListItem.vue';
import { getBotListApi } from '@/api/modules/console';
import type { BotListItem } from '../interface';

const loading = ref(false);
const botList = reactive<BotListItem[]>([]);
const $bus: any = inject('$bus')

const init = () => {
  loading.value = true;
  getBotListApi().then(res => {
    console.log('getBotListApi', res.data.length);
    if(res.data[0] !== null) {
      res.data.forEach((item: BotListItem) => {
        botList.push(item);
      });
    }
    loading.value = false;
  })
}

onMounted(() => {
  // init();
  $bus.on('initBotList', () => {
    init();
  })
});
onUnmounted(() => {
  $bus.off('initBotList');
});
</script>

<template>
  <div>
    <el-empty class="no-bot" v-show="!botList.length" description="暂无可用的机器人" />
    <botListItem v-show="botList.length" v-for="item in botList" :key="item.id" :botInfo="item"></botListItem>
  </div>
</template>

<style lang="scss" scoped>
.no-bot {
  height: 100%;
}
</style>