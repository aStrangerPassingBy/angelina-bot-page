<script setup lang='ts'>
import { ref, reactive, inject, onMounted, onUnmounted } from 'vue';
import { getUserPropertyApi } from '@/api/modules/console';
import type { TableColumnCtx } from 'element-plus';

type TableItem = {
  name: string,
  value: number,
}

type SummaryMethodProps<T = TableItem> = {
  columns: TableColumnCtx<T>[]
  data: T[]
}

const tokenPie = ref();
const loading = ref(false);
const tableData = reactive<TableItem[]>([]);
const $bus: any = inject('$bus');
const $echarts: any = inject('$echarts');

let myChart: any = null;

const drawPie = () => {
  const data: TableItem[] = []
  data.push(tableData[1]);
  tableData[0].value ? data.push(tableData[0]) : '';

  const option = {
    title: {
      text: 'token使用情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
  window.addEventListener('resize', myChart.resize);
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总和'
      return
    }
    const values = data.map((item: any) => Number(item[column.property]))
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)}`
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}

const init = () => {
  loading.value = true;
  myChart ? window.removeEventListener('resize', myChart.resize) : '';
  myChart = myChart = $echarts.init(tokenPie.value);
  getUserPropertyApi().then(res => {
    console.log('getUserPropertyApi', res);
    tableData.push({name: '已使用', value: res.useToken || 0});
    tableData.push({name: '未使用', value: (res.token || 0) - (res.useToken || 0)});
    drawPie();
  }).catch(err => {
    console.log('err', err);
  }).finally(() => {
    loading.value = false;
  })
}

onMounted(() => {
  init();
  $bus.on('initTokenSituation', () => {
    init();
  })
})
onUnmounted(() => {
  $bus.off('initTokenSituation');
  window.removeEventListener('resize', myChart.resize);
})
</script>

<template>
  <div class="token-box">
    <div class="token-pie" ref="tokenPie"></div>
    <div class="table-box">
      <el-table
        :data="tableData"
        border
        :summary-method="getSummaries"
        show-summary>
        <el-table-column prop="name" label="Token"/>
        <el-table-column prop="value" label="数量"/>
      </el-table>
      <el-tag type="info">Token不足时，请联系开发者进行补充</el-tag>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.token-box {
  display: flex;
  justify-content: center;
  .token-pie {
    width: 400px;
    height: 100%;
  }
  .table-box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 50%;
  }
}

</style>