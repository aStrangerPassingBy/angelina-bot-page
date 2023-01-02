import httpRequest from '@/api/index'

// 获取公告
const getNoticeUrl = '/api' + '/notice/getNotice';
export function getNoticeApi() {
  return httpRequest.get(getNoticeUrl);
}

// 查询全局bot在线状况
const getBotBoardUrl = '/api' + '/data/getBotBoard';
export function getBotBoardApi() {
  return httpRequest.get(getBotBoardUrl);
}

// 获取服务器内存，收发消息等数据
const getAllBotDataUrl = '/api' + '/data/getAllBotData';
export function getAllBotDataApi() {
  return httpRequest.get(getAllBotDataUrl);
}

// 查询全局方法使用次数
const getFuncListUrl = '/api' + '/data/getFuncList';
export function getFuncListApi() {
  return httpRequest.get(getFuncListUrl);
}

// 页面访问数据统计，按页面统计全量
const getVisitPageDataByPageUrl = '/api' + '/data/getVisitPageDataByPage';
export function getVisitPageDataByPageApi() {
  return httpRequest.get(getVisitPageDataByPageUrl);
}

// 页面访问数据统计，统计最近24小时
const getVisitPageDataByTimeUrl = '/api' + '/data/getVisitPageDataByTime';
export function getVisitPageDataByTimeApi() {
  return httpRequest.get(getVisitPageDataByTimeUrl);
}
