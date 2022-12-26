import httpRequest from '@/api/index'

// 查询用户余额
const getUserPropertyUrl = '/api' + '/user/getUserProperty';
export function getUserPropertyApi(data?: any) {
  return httpRequest.get(getUserPropertyUrl, data);
}

// 查看个人方法使用次数
const getSomeOneFuncListUrl = '/api' + '/data/getSomeOneFuncList';
export function getSomeOneFuncListApi(data?: any) {
  return httpRequest.get(getSomeOneFuncListUrl, data);
}

// 查询当前账户的所有bot列表
const getBotListUrl = '/api' + '/data/getBotList';
export function getBotListApi(data?: any) {
  return httpRequest.get(getBotListUrl, data);
}