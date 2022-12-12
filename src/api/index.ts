import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

const config = {
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    // 请求拦截器
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => {
				Promise.reject(error);
      }
    );

    // 相应拦截器
    this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			(error: AxiosError) => {
				Promise.reject(error);
			}
		);
  }

}

export default new RequestHttp(config)