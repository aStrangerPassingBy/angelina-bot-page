import httpRequest from '../index'

// 绑定bot
const addUserBotUrl = '/api' + '/login/addUserBot';
export function addUserBotApi(data: any) {
  return httpRequest.get(addUserBotUrl, data);
}

// 解绑bot
const removeUserBotUrl = '/api' + '/login/removeUserBot';
export function removeUserBotApi(data: any) {
  return httpRequest.get(removeUserBotUrl, data);
}

// 修改用户名
const editUserNameUrl = '/api' + '/login/editUserName';
export function editUserNameApi(data: any) {
  return httpRequest.get(editUserNameUrl, data);
}

// 修改密码
const editUserPwdUrl = '/api' + '/login/editUserPwd';
export function editUserPWDApi(data: any) {
  return httpRequest.get(editUserPwdUrl, data);
}

// 查询用户基础信息
const getUserInfoUrl = '/api' + '/login/getUserInfo';
export function getUserInfoApi(data: any) {
  return httpRequest.get(getUserInfoUrl, data);
}

// 查询用户余额
const getUserPropertyUrl = '/api' + '/login/getUserProperty';
export function getUserPropertyApi(data: any) {
  return httpRequest.get(getUserPropertyUrl, data);
}