import httpRequest from '@/api/index'

// 查询所有昵称
const getAllNickNameUrl = '/api' + '/data/getAllNickName';
export function getAllNickNameApi(data?: any) {
  return httpRequest.get(getAllNickNameUrl, data);
}