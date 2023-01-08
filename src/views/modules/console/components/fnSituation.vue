<script setup lang='ts'>
import { ref, inject, onMounted, onUnmounted } from 'vue';
import { getSomeOneFuncListApi } from '@/api/modules/console';

const barRef = ref();
const loading = ref(false);
const $bus: any = inject('$bus');
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
  getSomeOneFuncListApi().then(res => {
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
  $bus.on('initFnSituation', () => {
    init()
  })
})

onUnmounted(() => {
  $bus.off('initFnSituation');
})
</script>

<template>
  <div class="bar-box" v-loading="loading">
    <div class="bar" ref="barRef"></div>
  </div>
</template>

<style scoped lang='scss'>
.bar-box {
  width: 100%;
  height: 600px;
  .bar {
    width: 100%;
    height: 100%;
  }
}

</style>