import httpRequest from '@/api/index'

// 查询所有昵称
const getAllNickNameUrl = import.meta.env.VITE_API_URL_PERSON1 + '/data/getAllNickName';
export function getAllNickNameApi(data?: any) {
  return httpRequest.get(getAllNickNameUrl, data);
}