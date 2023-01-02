import axios from 'axios';
import { useGlobalStore } from '@/stores';
import { AxiosCanceler } from './axiosCancel';
import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ElMessage } from "element-plus";
import router from '@/router';

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
        const globalStore = useGlobalStore()
        axiosCanceler.addPending(config);
        return { ...config, headers: { ...config.headers, "Authorization": globalStore.token } };
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
        // 若请求时是blob类型
        if(response && config.responseType === 'blob') {
          if(response.status === 200) {
            return data
          }
        }
        // 其余情况判断code值
        if(data.code != 200) {
          console.log('code值不等于200');
          ElMessage.error(data.message);
          if(data.code == 301) {
            const globalStore = useGlobalStore();
            globalStore.initGlobalStore();
            const removeRoutes = router.getRoutes().filter(item => {
              return item.meta.type == 'admin' || item.meta.type == 'common';
            })
            removeRoutes.forEach(item => {
              router.removeRoute(item.name as string);
            })
            ElMessage.error(data.message);
            router.replace({
              name: 'Home'
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