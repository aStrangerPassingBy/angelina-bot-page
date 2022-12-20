import { reactive } from 'vue'

export const useTable = (api: any) => {
  const state = reactive({
    tableData: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  })

}