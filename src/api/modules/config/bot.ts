import httpRequest from '@/api/index'

// 查询当前账户的所有bot列表
const getBotListUrl = '/api' + '/data/getBotList';
export function getBotListApi(data?: any) {
  return httpRequest.get(getBotListUrl, data);
}

const getBotBoardUrl = '/api' + '/data/getBotBoard';
export function getBotBoardApi(data?: any) {
  return httpRequest.get(getBotBoardUrl, data);
}

const getFuncListUrl = '/api' + '/data/getFuncList';
export function getFuncListApi(data?: any) {
  return httpRequest.get(getFuncListUrl, data);
}

const getSomeOneFuncListUrl = '/api' + '/data/getSomeOneFuncList';
export function getSomeOneFuncListApi(data?: any) {
  return httpRequest.get(getSomeOneFuncListUrl, data);
}