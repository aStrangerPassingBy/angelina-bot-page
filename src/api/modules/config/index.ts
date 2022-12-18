import httpRequest from '@/api/index'

// 新增公告
const createNoticeUrl = '/api' + '/notice/createNotice';
export function createNoticeApi(data: any) {
  return httpRequest.post(createNoticeUrl, data);
}

// 删除公告
const deleteNoticeUrl = '/api' + '/notice/deleteNotice';
export function deleteNoticeApi(data: any) {
  return httpRequest.post(deleteNoticeUrl, data);
}

// 修改公告
const editNoticeUrl = '/api' + '/notice/editNotice';
export function editNoticeApi(data: any) {
  return httpRequest.post(editNoticeUrl, data);
}

// 获取公告
const getNoticeUrl = '/api' + '/notice/getNotice';
export function getNoticeApi(data?: any) {
  return httpRequest.get(getNoticeUrl, data);
}

// 获取公告图片
const createNoticeImgUrl = '/api' + '/notice/createNoticeImg';
export function createNoticeImgApi(data: any) {
  return httpRequest.post(createNoticeImgUrl, data);
}