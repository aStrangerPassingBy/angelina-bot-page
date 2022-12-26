<script setup lang='ts'>
import { ref, inject, onMounted } from 'vue';
import { getFuncListApi } from '@/api/modules/home';

const barRef = ref();
const $echarts: any = inject('$echarts');

const drawBar = (dimensions: any, source: any) => {
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
  getFuncListApi().then(res => {
    const { data } = res;
    const source: any[] = [];
    const dimensions = ['name', 'count'];
    data.sort((a: any, b: any) => b.count - a.count);
    const some = data.slice(0, 10);
    some.forEach((item: any) => {
      const arr = [];
      arr[0] = item.name;
      arr[1] = item.count;
      source.push(arr);
    })
    drawBar(dimensions, source)
  })
})
</script>

<template>
  <div>
    <div class="bar" ref="barRef"></div>
  </div>
</template>

<style scoped lang='scss'>
.bar {
  width: 100%;
  height: 100%;
}
</style>