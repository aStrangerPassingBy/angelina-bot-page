import httpRequest from '@/api/index'

// 获取公告
const getNoticeUrl = '/api' + '/notice/getNotice';
export function getNoticeApi(data?: any) {
  return httpRequest.get(getNoticeUrl, data);
}