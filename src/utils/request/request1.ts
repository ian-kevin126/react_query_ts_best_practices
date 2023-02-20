import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

interface ResponseData<T> {
  code: number;
  message: string;
  data: T;
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // 基础请求路径，可以根据实际情况进行修改
  timeout: 10000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // ...

    return config as InternalAxiosRequestConfig<any>;
  },
  (error: any) => {
    // 对请求错误做些什么
    // ...

    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    // ...

    const res = response.data as ResponseData<any>;

    if (res.code !== 200) {
      // 处理请求错误
      // ...

      return Promise.reject(res);
    }

    return res.data;
  },
  (error: any) => {
    // 对响应错误做些什么
    // ...

    return Promise.reject(error);
  }
);

// 定义请求方法
export default function request<T>(config: AxiosRequestConfig): Promise<T> {
  return service(config) as Promise<T>;
}
