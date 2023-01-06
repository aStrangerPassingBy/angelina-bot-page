import httpRequest from '@/api/index'

// 查询用户余额
const getUserPropertyUrl = import.meta.env.VITE_API_URL_PERSON1 + '/user/getUserProperty';
export function getUserPropertyApi(data?: any) {
  return httpRequest.get(getUserPropertyUrl, data);
}

// 查看个人方法使用次数
const getSomeOneFuncListUrl = import.meta.env.VITE_API_URL_PERSON1 + '/data/getSomeOneFuncList';
export function getSomeOneFuncListApi(data?: any) {
  return httpRequest.get(getSomeOneFuncListUrl, data);
}

// 查询当前账户的所有bot列表
const getBotListUrl = import.meta.env.VITE_API_URL_PERSON1 + '/data/getBotList';
export function getBotListApi(data?: any) {
  return httpRequest.get(getBotListUrl, data);
}