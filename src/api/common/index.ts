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

// 获取验证码
const creatCaptchaUrl = '/api' + '/login/creatCaptcha';
export function creatCaptchaApi(data: any) {
  return httpRequest.get(creatCaptchaUrl, data);
}

// 验证验证码是否正确
const captchaUrl = '/api' + '/login/captcha';
export function captchaApi(data: any) {
  return httpRequest.get(captchaUrl, data);
}

// 切换路由埋点
const visitPageUrl = '/api' + '/data/visitPage';
export function visitPageApi(data: any) {
  return httpRequest.get(visitPageUrl, data);
}

// 文件下载
const downloadUrl = '/api' + '/file/download';
export function downloadApi(data: any, config: any) {
  return httpRequest.post(downloadUrl, data, config);
}