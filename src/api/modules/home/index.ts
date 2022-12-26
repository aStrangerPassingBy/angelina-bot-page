import httpRequest from '@/api/index'

// 获取公告
const getNoticeUrl = '/api' + '/notice/getNotice';
export function getNoticeApi(data?: any) {
  return httpRequest.get(getNoticeUrl, data);
}

// 查询全局bot在线状况
const getBotBoardUrl = '/api' + '/data/getBotBoard';
export function getBotBoardApi(data?: any) {
  return httpRequest.get(getBotBoardUrl, data);
}

// 查询全局方法使用次数
const getFuncListUrl = '/api' + '/data/getFuncList';
export function getFuncListApi(data?: any) {
  return httpRequest.get(getFuncListUrl, data);
}
