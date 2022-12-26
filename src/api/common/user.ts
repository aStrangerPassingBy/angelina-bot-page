import httpRequest from '../index'

// 绑定bot
const addUserBotUrl = '/api' + '/user/addUserBot';
export function addUserBotApi(data: any) {
  return httpRequest.get(addUserBotUrl, data);
}

// 解绑bot
const removeUserBotUrl = '/api' + '/user/removeUserBot';
export function removeUserBotApi(data: any) {
  return httpRequest.get(removeUserBotUrl, data);
}

// 修改用户名
const editUserNameUrl = '/api' + '/user/editUserName';
export function editUserNameApi(data: any) {
  return httpRequest.get(editUserNameUrl, data);
}

// 修改密码
const editUserPwdUrl = '/api' + '/user/editUserPwd';
export function editUserPWDApi(data: any) {
  return httpRequest.post(editUserPwdUrl, data);
}

// 查询用户基础信息
const getUserInfoUrl = '/api' + '/user/getUserInfo';
export function getUserInfoApi(data?: any) {
  return httpRequest.get(getUserInfoUrl, data);
}