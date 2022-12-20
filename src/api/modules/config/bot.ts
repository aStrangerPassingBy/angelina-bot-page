import httpRequest from '@/api/index'

// 查询当前账户的所有bot列表
const getBotListUrl = '/api' + '/data/getBotList';
export function getBotListApi(data?: any) {
  return httpRequest.get(getBotListUrl, data);
}