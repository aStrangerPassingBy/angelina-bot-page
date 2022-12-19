import httpRequest from '../index'

// 登录
const loginUrl = '/api' + '/login/pwd';
export function loginApi(data: any) {
  return httpRequest.post(loginUrl, data);
}

// 注册
const registerUrl = '/api' + '/login/register';
export function registerApi(data: any) {
  return httpRequest.post(registerUrl, data);
}

// 获取RSA公钥
const getRSAPublicKeyUrl = '/api' + '/login/getRSAPublicKey';
export function getRSAPublicKeyApi() {
  return httpRequest.get(getRSAPublicKeyUrl);
}