import httpRequest from '@/api/index'

// 查询所有卡池
const getAllPoolDataUrl = '/api' + '/data/getAllPoolData';
export function getAllPoolDataApi(data: any) {
  return httpRequest.get(getAllPoolDataUrl, data);
}