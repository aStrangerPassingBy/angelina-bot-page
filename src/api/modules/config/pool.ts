import httpRequest from '@/api/index'

// 查询所有卡池
const getAllPoolDataUrl = import.meta.env.VITE_API_URL_PERSON1 + '/data/getAllPoolData';
export function getAllPoolDataApi(data: any) {
  return httpRequest.get(getAllPoolDataUrl, data);
}