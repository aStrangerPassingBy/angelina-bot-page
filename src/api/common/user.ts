import httpRequest from '../index'

// 绑定bot
const addUserBotUrl = import.meta.env.VITE_API_URL_PERSON1 + '/user/addUserBot';
export function addUserBotApi(data: any) {
  return httpRequest.get(addUserBotUrl, data);
}

// 解绑bot
const removeUserBotUrl = import.meta.env.VITE_API_URL_PERSON1 + '/user/removeUserBot';
export function removeUserBotApi(data: any) {
  return httpRequest.get(removeUserBotUrl, data);
}

// 修改用户名
const editUserNameUrl = import.meta.env.VITE_API_URL_PERSON1 + '/user/editUserName';
export function editUserNameApi(data: any) {
  return httpRequest.get(editUserNameUrl, data);
}

// 修改密码
const editUserPwdUrl = import.meta.env.VITE_API_URL_PERSON1 + '/user/editUserPwd';
export function editUserPWDApi(data: any) {
  return httpRequest.post(editUserPwdUrl, data);
}

// 查询用户基础信息
const getUserInfoUrl = import.meta.env.VITE_API_URL_PERSON1 + '/user/getUserInfo';
export function getUserInfoApi(data?: any) {
  return httpRequest.get(getUserInfoUrl, data);
}