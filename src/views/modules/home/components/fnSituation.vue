<script setup lang='ts'>
import { ref, inject, onMounted } from 'vue';
import { getFuncListApi } from '@/api/modules/home';

const barRef = ref();
const loading = ref(false);
const $echarts: any = inject('$echarts');

const drawBar = (dimensions: string[], source: (string|number)[]) => {
  console.log('dimensions', dimensions, source);
  
  var myChart = $echarts.init(barRef.value);
  const option = {
    dataset: [
      {
        dimensions: dimensions,
        source: source
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'count', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  };
  option && myChart.setOption(option);
}

onMounted(() => {
  loading.value = true;
  getFuncListApi().then(res => {
    const data: Array<{name: string, count: number}> = res.data;
    const source: Array<number| string> = [];
    const dimensions = ['name', 'count'];
    data.sort((a, b) => b.count - a.count);
    const some: Array<{name: string, count: number}> = data.slice(0, 10);
    some.forEach(item => {
      const arr: Array<number | string> = [];
      arr[0] = item.name;
      arr[1] = item.count;
      source.push(arr as any);
    })
    drawBar(dimensions, source);
    loading.value = false;
  })
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