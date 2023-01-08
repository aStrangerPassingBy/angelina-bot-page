<script setup lang='ts'>
import { ref, inject, onMounted } from 'vue';
import { getBotBoardApi } from '@/api/modules/home';

const pieRef = ref();
const loading = ref(false);
const $echarts: any = inject('$echarts');

const drawPie = (data: any) => {
  var myChart = $echarts.init(pieRef.value);
  const option = {
    title: {
      text: '在线情况',
      left: 'left'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };
  option && myChart.setOption(option);
}

const init = () => {
  loading.value = true
  getBotBoardApi().then(res => {
    const data = [
      { value: res.data.online, name: 'online' },
      { value: res.data.offline, name: 'offline' }
    ]
    drawPie(data);
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
    <div class="pie" ref="pieRef"></div>
  </div>
</template>

<style scoped lang='scss'>
.pie {
  width: 100%;
  height: 100%;
}
</style>