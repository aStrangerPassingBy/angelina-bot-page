<script setup lang='ts'>
import { ref, inject, onMounted } from 'vue';
import { getFuncListApi } from '@/api/modules/home';

const barRef = ref();
const loading = ref(false);
const $echarts: any = inject('$echarts');

const drawBar = (xAxis: string[], yAxis: number[]) => {
  
  var myChart = $echarts.init(barRef.value);
  const option = {
    title: {
      text: '功能使用情况',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    xAxis: {
      data: xAxis,
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {
      type: 'value'
    },
    series: {
      type: 'bar',
      data: yAxis,
    },
  };
  option && myChart.setOption(option);
}

const init = () => {
  loading.value = true;
  getFuncListApi().then(res => {
    const xAxis: string[] = [], yAxis: number[] = [];
    const data: Array<{name: string, count: number}> = res.data;
    data.sort((a, b) => b.count - a.count);
    const some: Array<{name: string, count: number}> = data.slice(0, 10);
    some.forEach(item => {
      xAxis.push(item.name);
      yAxis.push(item.count);
    })
    drawBar(xAxis, yAxis);
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
  <div v-loading="loading">
    <div class="bar" ref="barRef"></div>
  </div>
</template>

<style scoped lang='scss'>
.bar {
  width: 100%;
  height: 100%;
}
</style>