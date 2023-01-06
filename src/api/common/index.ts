import httpRequest from '../index'

// 登录
const loginUrl = import.meta.env.VITE_API_URL_PERSON1 + '/login/pwd';
export function loginApi(data: any) {
  return httpRequest.post(loginUrl, data);
}

// 注册
const registerUrl = import.meta.env.VITE_API_URL_PERSON1 + '/login/register';
export function registerApi(data: any) {
  return httpRequest.post(registerUrl, data);
}

// 获取RSA公钥
const getRSAPublicKeyUrl = import.meta.env.VITE_API_URL_PERSON1 + '/login/getRSAPublicKey';
export function getRSAPublicKeyApi() {
  return httpRequest.get(getRSAPublicKeyUrl);
}

// 获取验证码
const creatCaptchaUrl = import.meta.env.VITE_API_URL_PERSON1 + '/login/creatCaptcha';
export function creatCaptchaApi(data: any) {
  return httpRequest.get(creatCaptchaUrl, data);
}

// 验证验证码是否正确
const captchaUrl = import.meta.env.VITE_API_URL_PERSON1 + '/login/captcha';
export function captchaApi(data: any) {
  return httpRequest.get(captchaUrl, data);
}

// 切换路由埋点
const visitPageUrl = import.meta.env.VITE_API_URL_PERSON1 + '/data/visitPage';
export function visitPageApi(data: any) {
  return httpRequest.get(visitPageUrl, data);
}

// 文件下载
const downloadUrl = import.meta.env.VITE_API_URL_PERSON1 + '/file/download';
export function downloadApi(data: any, config: any) {
  return httpRequest.post(downloadUrl, data, config);
}