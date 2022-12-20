import axios from 'axios'
import { AxiosCanceler } from './axiosCancel';
import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { getSessionStorage } from '@/utils/storage';
import { ElMessage } from "element-plus";
import router from '@/router'
import { clearSessionStorage } from '@/utils/storage';

const axiosCanceler = new AxiosCanceler();

const config = {
  // 默认请求地址
	// baseURL: import.meta.env.VITE_API_URL,
  baseURL: '/',
  // 超时时间
	timeout: 10000,
  // 跨域时候允许携带凭证
	// withCredentials: true
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // console.log('api config', config);
        axiosCanceler.addPending(config);
        const token: string = getSessionStorage('token');
        return { ...config, headers: { ...config.headers, "Authorization": token } };
      },
      (error: AxiosError) => {
				Promise.reject(error);
      }
    );

    // 响应拦截器
    this.service.interceptors.response.use(
			(response: AxiosResponse) => {
        const { data, config } = response;
        axiosCanceler.removePending(config);
        if(data.code != 200) {
          console.log('code值不等于200');
          ElMessage.error(data.message);
          if(data.code == 301) {
            clearSessionStorage();
            const removeRoutes = router.getRoutes().filter(item => {
              return item.meta.level == 1 || item.meta.level == 2;
            })
            removeRoutes.forEach(item => {
              router.removeRoute(item.name as string);
            })
            ElMessage.error(data.message);
            router.replace({
              name: 'Login'
            })
          }
          return Promise.reject(data);
        }
        return data
			},
			(error: AxiosError) => {
        console.log('拦截器Error');
				Promise.reject(error);
			}
		);
  }

  // 请求方法
	get(url: string, params?: any, obj = {}): Promise<any> {
		return this.service.get(url, { params, ...obj });
	}
	post(url: string, params?: any, obj = {}): Promise<any> {
		return this.service.post(url, params, obj);
	}
	put(url: string, params?: any, obj = {}): Promise<any> {
		return this.service.put(url, params, obj);
	}
	delete(url: string, params?: any, obj = {}): Promise<any> {
		return this.service.delete(url, { params, ...obj });
	}
}

export default new RequestHttp(config)