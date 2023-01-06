import httpRequest from '@/api/index'

// 新增公告
const createNoticeUrl = import.meta.env.VITE_API_URL_PERSON1 + '/notice/createNotice';
export function createNoticeApi(data: any, config: any) {
  return httpRequest.post(createNoticeUrl, data, config);
}

// 删除公告
const deleteNoticeUrl = import.meta.env.VITE_API_URL_PERSON1 + '/notice/deleteNotice';
export function deleteNoticeApi(data: any) {
  return httpRequest.delete(deleteNoticeUrl, data);
}

// 修改公告
const editNoticeUrl = import.meta.env.VITE_API_URL_PERSON1 + '/notice/editNotice';
export function editNoticeApi(data: any, config: any) {
  return httpRequest.post(editNoticeUrl, data, config);
}

// 获取公告
const getNoticeUrl = import.meta.env.VITE_API_URL_PERSON1 + '/notice/getNotice';
export function getNoticeApi(data?: any) {
  return httpRequest.get(getNoticeUrl, data);
}

// 获取公告图片
const getNoticeImgUrl = import.meta.env.VITE_API_URL_PERSON1 + '/notice/getNoticeImg';
export function getNoticeImgApi(data: any, config?: any) {
  return httpRequest.get(getNoticeImgUrl, data, config);
}